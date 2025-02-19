/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'nuevo_username', description: 'Nuevo nombre de usuario', required: false })
  username?: string;

  @ApiProperty({ example: 'nuevo@example.com', description: 'Nuevo correo electrónico', required: false })
  email?: string;

  @ApiProperty({ example: 'nueva_password123', description: 'Nueva contraseña', required: false })
  password_hash?: string;
}
