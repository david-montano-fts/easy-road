import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { RecursosService } from '../services/recursos.service';
import { Recurso } from '../schemas/recurso.schema';
import MongooseClassSerializerInterceptor from '../utils/mongooseClassSerializer.interceptor';
import { CreateRecursoDto, UpdateRecursoDto } from '../dtos/recurso.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('recursos')
@UseInterceptors(MongooseClassSerializerInterceptor(Recurso))
export class RecursosController {
  constructor(private readonly recursosService: RecursosService) { }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createRecursoDto: CreateRecursoDto) {
    return this.recursosService.create(createRecursoDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.recursosService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: string) {
    return this.recursosService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateRecursoDto: UpdateRecursoDto) {
    return this.recursosService.update(id, updateRecursoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.recursosService.delete(id);
  }
}
