import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { EstadosService } from '../services/estados.service';
import { Estado } from '../schemas/estado.schema';
import MongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';
import { CreateEstadoDto, UpdateEstadoDto } from '../dtos/estado.dto';
import { AuthModule } from 'src/modules/auth.module';

@Controller('estados')
@UseInterceptors(MongooseClassSerializerInterceptor(Estado))
export class EstadosController {
  constructor(private readonly estadosService: EstadosService) { }

  @Post()
  @UseGuards(AuthModule)
  create(@Body() createEstadoDto: CreateEstadoDto) {
    return this.estadosService.create(createEstadoDto);
  }

  @Get()
  @UseGuards(AuthModule)
  findAll() {
    return this.estadosService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthModule)
  findById(@Param('id') id: string) {
    return this.estadosService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AuthModule)
  update(@Param('id') id: string, @Body() updateEstadoDto: UpdateEstadoDto) {
    return this.estadosService.update(id, updateEstadoDto);
  }

  @Delete(':id')
  @UseGuards(AuthModule)
  delete(@Param('id') id: string) {
    return this.estadosService.delete(id);
  }
}
