/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from '../roles/roles.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['roles'] });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id }, relations: ['roles'] });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['roles'],
      select: ['id', 'username', 'email', 'password_hash'], // 🔹 Incluir password_hash
    });
  }  

  async create(userData: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password_hash, 10);
    const user = this.usersRepository.create({
      ...userData,
      password_hash: hashedPassword, // Se asegura de guardar password_hash correctamente
    });
    return this.usersRepository.save(user);
  }

  async update(id: number, userData: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // Si hay un nuevo password, lo encripta antes de actualizar
    if (userData.password_hash) {
      userData.password_hash = await bcrypt.hash(userData.password_hash, 10);
    }

    await this.usersRepository.update(id, userData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }
    await this.usersRepository.delete(id);
  }
}

