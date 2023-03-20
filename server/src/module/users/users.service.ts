import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import * as process from 'process';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
}
