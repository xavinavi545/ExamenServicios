/* eslint-disable prettier/prettier */
 
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './create-role.dto';
import { UpdateRoleDto } from './update-role.dto';

@ApiTags('Roles')
@ApiBearerAuth() // Swagger exigirá token JWT para acceder a estos endpoints
@UseGuards(AuthGuard('jwt')) // Protege todas las rutas con JWT
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los roles' })
  @ApiResponse({ status: 200, description: 'Lista de roles obtenida exitosamente.' })
  getRoles() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un rol por ID' })
  @ApiResponse({ status: 200, description: 'Rol encontrado.' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado.' })
  getRole(@Param('id') id: number) {
    return this.rolesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo rol' })
  @ApiResponse({ status: 201, description: 'Rol creado correctamente.' })
  @ApiResponse({ status: 400, description: 'El rol ya existe.' })
  createRole(@Body() body: CreateRoleDto) {
    return this.rolesService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un rol' })
  @ApiResponse({ status: 200, description: 'Rol actualizado correctamente.' })
  updateRole(@Param('id') id: number, @Body() body: UpdateRoleDto) {
    return this.rolesService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un rol' })
  @ApiResponse({ status: 200, description: 'Rol eliminado correctamente.' })
  deleteRole(@Param('id') id: number) {
    return this.rolesService.delete(id);
  }
}
