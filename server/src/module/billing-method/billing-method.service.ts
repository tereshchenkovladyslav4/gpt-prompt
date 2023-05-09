import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { BillingMethod } from './billing-method.entity';
import { BillingMethodDto } from './dto/billing-method.dto';
import { User } from '../users/user.entity';

@Injectable()
export class BillingMethodService {
  private stripe;

  constructor(
    @InjectRepository(BillingMethod)
    private billingMethodRepository: Repository<BillingMethod>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_PUBLIC_KEY, { apiVersion: '2022-11-15' });
  }

  async getCardSetupToken(): Promise<string> {
    const setupIntent = await this.stripe.setupIntents.create({ usage: 'off_session' });
    return setupIntent.client_secret;
  }

  async save(data: BillingMethodDto) {
    const { userId, address } = data;
    const paymentMethodToken = data.paymentMethodToken;
    const stripePaymentMethod = await this.stripe.paymentMethods.retrieve(paymentMethodToken);

    const card = stripePaymentMethod.card;
    const expireAt = new Date();
    expireAt.setFullYear(card.exp_year);
    expireAt.setMonth(card.exp_month);
    expireAt.setDate(1);

    const existingPaymentMethod = await this.billingMethodRepository.findOne({ where: { userId: userId } });

    let customerId = existingPaymentMethod?.customerId || '';

    if (customerId) {
      await this.stripe.paymentMethods.attach(stripePaymentMethod.id, { customer: customerId });
      await this.stripe.customers.update(customerId, {
        invoice_settings: { default_payment_method: stripePaymentMethod.id },
      });
    } else {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      const customer = await this.stripe.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        payment_method: stripePaymentMethod.id,
        invoice_settings: { default_payment_method: stripePaymentMethod.id },
      });
      customerId = customer.id;
    }

    return await this.billingMethodRepository.save({
      id: existingPaymentMethod?.id || null,
      userId: userId,
      customerId: customerId,
      name: card.last4,
      expireAt: expireAt,
      address: JSON.stringify(address),
      paymentMethodId: paymentMethodToken,
      cardCountry: card.country,
    });
  }
}
