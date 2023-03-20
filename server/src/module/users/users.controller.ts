import { Controller, Get, Param, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiResponse } from '@models';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<ApiResponse<User>> {
    try {
      const user = await this.usersService.getByEmail(data.email);
      if (user) {
        return {
          success: false,
          statusCode: HttpStatus.CONFLICT,
          message: ['User already exists'],
        };
      }

      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: ['User added successfully'],
        result: await this.usersService.create(data),
      };
    } catch (err) {
      return {
        success: false,
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
