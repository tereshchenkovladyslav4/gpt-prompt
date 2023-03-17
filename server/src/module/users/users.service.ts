import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    return await this.usersRepository.save(data);
  }

  async read(id: number) {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async getByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email: email } });
  }
}
