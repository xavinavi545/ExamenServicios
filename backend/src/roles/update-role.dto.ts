/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty({ example: 'editor', description: 'Nuevo nombre del rol', required: false })
  name?: string;
}
