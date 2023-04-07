import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { CreateUserTable1678998040775 } from './migration/1678998040775-CreateUserTable';
import { CreateTemplateTable1678998082380 } from './migration/1678998082380-CreateTemplateTable';
import { UpdateUserTable1679279658988 } from './migration/1679279658988-UpdateUserTable';
import { UpdateTemplateTable1679322876482 } from './migration/1679322876482-UpdateTemplateTable';
import { UpdateTemplateTable1680093087191 } from './migration/1680093087191-UpdateTemplateTable';
import { CreatePlanTable1680827223545 } from './migration/1680827223545-CreatePlanTable';
import { UpdatePlanTable1680828046085 } from './migration/1680828046085-UpdatePlanTable';
import { Plan } from './module/plan/plan.entity';
import { Template } from './module/templates/template.entity';
import { User } from './module/users/user.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASS'),
  database: configService.get('DB_NAME'),
  entities: [User, Template, Plan],
  migrations: [
    CreateUserTable1678998040775,
    CreateTemplateTable1678998082380,
    UpdateUserTable1679279658988,
    UpdateTemplateTable1679322876482,
    UpdateTemplateTable1680093087191,
    CreatePlanTable1680827223545,
    UpdatePlanTable1680828046085,
  ],
});
