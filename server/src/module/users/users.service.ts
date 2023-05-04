import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentStatus, SubscriptionStatus } from '@enums';
import { Not, Repository } from 'typeorm';
import * as crypto from 'crypto';
import * as process from 'process';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';
import { BillingMethod } from '../billing-method/billing-method.entity';
import { Plan } from '../plan/plan.entity';
import { RequestSubscriptionDto } from '../subscription/dto/request-subscription.dto';
import { Subscription } from '../subscription/subscription.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Plan)
    private plansRepository: Repository<Plan>,
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
    @InjectRepository(BillingMethod)
    private billingMethodsRepository: Repository<BillingMethod>,
    private jwtService: JwtService,
  ) {}

  encryptPassword(password: string) {
    return crypto.createHash('md5').update(`${password}${process.env.SALT}`).digest('hex');
  }

  async create(data: CreateUserDto) {
    return await this.usersRepository.save({ ...data, password: this.encryptPassword(data.password) });
  }

  async read(id: number) {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async getByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email: email } });
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.getByEmail(username);
    if (user && user.password === this.encryptPassword(password)) {
      if (user.active) {
        delete user.password;
        return user;
      }
    }
    return null;
  }

  async login(user: User) {
    delete user.password;
    const subscription = await this.subscriptionsRepository
      .createQueryBuilder('Subscription')
      .where({ userId: user.id })
      .andWhere({ status: Not(SubscriptionStatus.CANCELLED) })
      .orderBy('id', 'DESC')
      .getOne();

    const billingMethod = await this.billingMethodsRepository
      .createQueryBuilder('BillingMethod')
      .where({ userId: user.id })
      .getOne();

    const payload = { user: { ...user, subscription: subscription, billingMethod: billingMethod } };
    return this.jwtService.sign(payload, { expiresIn: '1 day' });
  }

  async subscribe(data: RequestSubscriptionDto) {
    const existingSubscription = await this.subscriptionsRepository.findOne({
      where: { userId: data.userId, status: Not(SubscriptionStatus.CANCELLED) },
    });

    if (existingSubscription) {
      await this.subscriptionsRepository.save({ ...existingSubscription, status: SubscriptionStatus.CANCELLED });
    }

    const plan = await this.plansRepository.findOne({ where: { id: data.planId } });
    const amount = plan.price;
    const vatAmount = (amount * (+process.env.VAT_PERCENT || 0)) / 100;
    await this.subscriptionsRepository.save({
      ...data,
      amount,
      vatAmount,
      billingSchema: plan.period,
      status: SubscriptionStatus.INACTIVE,
      paymentStatus: PaymentStatus.NOT_PAID,
    });

    return await this.login(await this.read(data.userId));
  }
}
