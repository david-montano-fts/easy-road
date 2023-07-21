import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../dtos/usuario.dto';
import MongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';
import { Usuario } from '../schemas/usuario.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('usuarios')
@UseInterceptors(MongooseClassSerializerInterceptor(Usuario))
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: string) {
    return this.usuariosService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.usuariosService.delete(id);
  }
}
