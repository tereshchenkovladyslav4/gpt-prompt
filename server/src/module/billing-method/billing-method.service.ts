import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { BillingMethod } from './billing-method.entity';
import { BillingMethodDto } from './dto/billing-method.dto';

@Injectable()
export class BillingMethodService {
  private stripe;

  constructor(
    @InjectRepository(BillingMethod)
    private billingMethodRepository: Repository<BillingMethod>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_PUBLIC_KEY, { apiVersion: '2022-11-15' });
  }

  async getCardSetupToken(): Promise<string> {
    const setupIntent = await this.stripe.setupIntents.create({ usage: 'off_session' });
    return setupIntent.client_secret;
  }

  async save(data: BillingMethodDto) {
    const paymentMethodToken = data.paymentMethodToken;
    const stripePaymentMethod = await this.stripe.paymentMethods.retrieve(paymentMethodToken);

    const card = stripePaymentMethod.card;
    const expireAt = new Date();
    expireAt.setFullYear(card.exp_year);
    expireAt.setMonth(card.exp_month);
    expireAt.setDate(1);

    return await this.billingMethodRepository.save({
      userId: data.userId,
      name: card.last4,
      expireAt: expireAt,
      address: JSON.stringify(data.address),
      paymentMethodId: paymentMethodToken,
      cardCountry: card.country,
    });
  }
}
