import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ProyectosService } from '../services/proyectos.service';
import { Proyecto } from '../schemas/proyecto.schema';
import MongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';
import { CreateProyectoDto, UpdateProyectoDto, ProyectoUsuariosDto } from '../dtos/proyecto.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/utils/user.decorator';

@Controller('proyectos')
@UseInterceptors(MongooseClassSerializerInterceptor(Proyecto))
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@User() user: any, @Body() createProyectoDto: CreateProyectoDto) {
    return this.proyectosService.create(user, createProyectoDto);
  }

  @Post('relate-usuarios')
  @UseGuards(AuthGuard)
  relateUsuarios(@Body() proyectoUsuariosDto: ProyectoUsuariosDto) {
    return this.proyectosService.relateUsuarios(proyectoUsuariosDto);
  }

  @Post('unbind-usuarios')
  @UseGuards(AuthGuard)
  unbindUsuarios(@Body() proyectoUsuariosDto: ProyectoUsuariosDto) {
    return this.proyectosService.unbindUsuarios(proyectoUsuariosDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.proyectosService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: string) {
    return this.proyectosService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateProyectoDto: UpdateProyectoDto) {
    return this.proyectosService.update(id, updateProyectoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.proyectosService.delete(id);
  }
}
