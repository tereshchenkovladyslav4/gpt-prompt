import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
    const payload = { user: user };
    return this.jwtService.sign(payload, { expiresIn: '1 day' });
  }
}
