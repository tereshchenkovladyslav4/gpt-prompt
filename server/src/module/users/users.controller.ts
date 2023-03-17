import { Controller, Get, Param, HttpStatus, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    try {
      const user = await this.usersService.getByEmail(data.email);
      if (user) {
        return {
          statusCode: HttpStatus.CONFLICT,
          message: ['User already exists'],
        };
      }

      return {
        statusCode: HttpStatus.OK,
        message: ['User added successfully'],
        data: await this.usersService.create(data),
      };
    } catch (err) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  @Get(':id')
  async readUser(@Param('id') id: number) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.usersService.read(id),
    };
  }
}
