/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'Nombre de usuario' })
  username: string;

  @ApiProperty({ example: 'john@example.com', description: 'Correo electrónico' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña en texto plano (se encripta automáticamente)' })
  password_hash: string;
}
