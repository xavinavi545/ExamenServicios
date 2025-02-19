/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { User } from '../users/user.entity';
import { Role } from '../roles/roles.entity';

config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'mysql_container',  
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'admin',  
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'user_management',
  entities: [User, Role],
  synchronize: true,  // ⚠️ En producción cambiar a false
};

