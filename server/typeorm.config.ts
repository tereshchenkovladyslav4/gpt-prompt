import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from './src/users/user.entity';
import { Template } from './src/templates/template.entity';
import { CreateUserTable1678998040775 } from './migrations/1678998040775-CreateUserTable';
import { CreateTemplateTable1678998082380 } from './migrations/1678998082380-CreateTemplateTable';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASS'),
  database: configService.get('DB_NAME'),
  entities: [User, Template],
  migrations: [CreateUserTable1678998040775, CreateTemplateTable1678998082380],
});
