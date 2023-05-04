import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from '../../../core/services';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Address, BillingMethod, DialogData } from '../../../core/models';
import { NGX_STRIPE_SUBSCRIPTION_CONFIG, NgxStripeSubscriptionConfig } from '../../ngx-stripe-subscription.config';
import { BillingService } from '../../services/billing/billing.service';
import { MatSnackBar } from '@angular/material/snack-bar';

declare const Stripe: any;

@Component({
  selector: 'lib-stripe-card',
  templateUrl: './stripe-card.component.html',
  styleUrls: ['./stripe-card.component.scss'],
})
export class StripeCardComponent implements OnInit {
  stripe: any;
  card: any;
  cardExpiry: any;
  cardCvc: any;
  cardError: string | undefined;
  infoForm: FormGroup;
  submitted: boolean = false;
  address: Address;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private formValidationService: FormValidationService,
    private billingService: BillingService,
    private dialogRef: MatDialogRef<StripeCardComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData<BillingMethod>,
    @Inject(NGX_STRIPE_SUBSCRIPTION_CONFIG) private config: NgxStripeSubscriptionConfig,
  ) {
    this.infoForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      address1: [null, [Validators.required]],
      zip: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      selectedCountry: [null, [Validators.required]],
    });

    this.address = {
      first_name: '',
      last_name: '',
      address1: '',
      city: '',
      country: '',
      country_code: '',
      province: '',
      province_code: '',
      zip: '',
    };
  }

  ngOnInit() {
    this.stripe = new Stripe(this.config.STRIPE_PUBLIC_KEY);
    this.setupStripeElements();
  }

  checkError(form: FormGroup, field: string, error: string | string[]) {
    return this.formValidationService.checkError(form, field, error);
  }

  private setupStripeElements() {
    const elements = this.stripe.elements();

    const style = {
      base: {
        fontWeight: '400',
        fontSize: '16px',
        padding: '0 14px 0 14px',
        width: '100%',
        color: '#3f3f3f',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };

    this.card = elements.create('cardNumber', {
      style: style,
      showIcon: true,
    });

    this.cardExpiry = elements.create('cardExpiry', {
      style: style,
    });

    this.cardCvc = elements.create('cardCvc', {
      style: style,
    });

    this.card.mount('#card-element');
    this.card.on('change', (event: any) => this.setOutcome(event));

    this.cardExpiry.mount('#card-expiry');
    this.cardCvc.mount('#card-cvc');
  }

  private setOutcome(event: any) {
    if (event.error) {
      this.cardError = event.error.message;
    } else {
      this.cardError = undefined;
    }
  }

  async submitForm() {
    if (!this.infoForm.valid) {
      this.infoForm.markAllAsTouched();
      return;
    }

    const extraDetails = {
      name: this.infoForm.value.firstName + (this.infoForm.value.lastName ? ' ' + this.infoForm.value.lastName : ''),
      address: {
        line1: this.infoForm.value.address1,
        city: this.infoForm.value.city,
        state: this.infoForm.value.state,
        postal_code: this.infoForm.value.zip,
        country: this.infoForm.value.selectedCountry?.code,
      },
    };

    this.submitted = true;
    await this.billingService.getCardSetupToken().subscribe((res) => {
      if (!res.success) {
        this.snackBar.open(res.message?.[0] || '', 'Dismiss', { duration: 4000 });
        this.submitted = false;
        return;
      }

      const token = res.result;

      this.stripe
        .confirmCardSetup(token, {
          payment_method: {
            card: this.card,
            billing_details: extraDetails,
          },
        })
        .then((result: any) => {
          this.handleCreditCardResult(result, { ...this.address, ...this.infoForm.value });
        });
    });
  }

  private async handleCreditCardResult(result: any, address: Address) {
    if (result.error) {
      this.submitted = false;
      return;
    }
    const paymentMethod = result.setupIntent.payment_method;

    this.billingService.registerUserCardPaymentMethod(paymentMethod, address).subscribe(
      (res) => {
        this.submitted = false;
        if (!res.success) {
          this.snackBar.open(res.message?.[0] || '', 'Dismiss', { duration: 4000 });
          return;
        }

        this.snackBar.open('Payment method successfully added', 'Dismiss', { duration: 4000 });
        this.dialogRef.close(res.result);
      },
      (err: HttpErrorResponse) => {
        this.submitted = false;
        this.snackBar.open(err.message || '', 'Dismiss', { duration: 4000 });
      },
    );
  }
}
