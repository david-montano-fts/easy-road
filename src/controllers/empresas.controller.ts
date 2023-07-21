import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { EmpresasService } from '../services/empresas.service';
import { CreateEmpresaDto, UpdateEmpresaDto } from '../dtos/empresa.dto';
import { Empresa } from '../schemas/empresa.schema';
import MongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('empresas')
@UseInterceptors(MongooseClassSerializerInterceptor(Empresa))
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) { }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresasService.create(createEmpresaDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.empresasService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: string) {
    return this.empresasService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresasService.update(id, updateEmpresaDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.empresasService.delete(id);
  }
}
