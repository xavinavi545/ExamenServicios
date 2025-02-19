/* eslint-disable prettier/prettier */ 
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */ 
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity'; // ✅ Agregar esta línea

import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password_hash))) {
      const { password_hash, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  async login(user: User) {
    const payload = { sub: user.id, email: user.email, roles: user.roles.map(r => r.name) };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }  
}
