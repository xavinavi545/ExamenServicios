/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './roles.entity';
import { CreateRoleDto } from './create-role.dto';
import { UpdateRoleDto } from './update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.rolesRepository.findOne({ where: { id } });
    if (!role) {
      throw new Error('Role not found');
    }
    return role;
  }

  async findByName(name: string): Promise<Role | null> {
    return this.rolesRepository.findOne({ where: { name } });
  }

  async create(roleData: CreateRoleDto): Promise<Role> {
    const roleExists = await this.findByName(roleData.name);
    if (roleExists) {
      throw new Error('El rol ya existe');
    }
    const role = this.rolesRepository.create(roleData);
    return this.rolesRepository.save(role);
  }

  async update(id: number, roleData: UpdateRoleDto): Promise<Role> {
    await this.rolesRepository.update(id, roleData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.rolesRepository.delete(id);
  }
}
