import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { PerfilesService } from '../services/perfiles.service';
import { Perfil } from '../schemas/perfil.schema';
import MongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';
import { CreatePerfilDto, UpdatePerfilDto, PerfilRecursosDto } from '../dtos/perfil.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('perfiles')
@UseInterceptors(MongooseClassSerializerInterceptor(Perfil))
export class PerfilesController {
  constructor(private readonly perfilesService: PerfilesService) { }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createPerfilDto: CreatePerfilDto) {
    return this.perfilesService.create(createPerfilDto);
  }

  @Post('relate-resources')
  @UseGuards(AuthGuard)
  relateResources(@Body() perfilResourceDto: PerfilRecursosDto) {
    return this.perfilesService.relateResources(perfilResourceDto);
  }

  @Post('unbind-resources')
  @UseGuards(AuthGuard)
  unbindResources(@Body() perfilResourceDto: PerfilRecursosDto) {
    return this.perfilesService.unbindResources(perfilResourceDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.perfilesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: string) {
    return this.perfilesService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updatePerfilDto: UpdatePerfilDto) {
    return this.perfilesService.update(id, updatePerfilDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.perfilesService.delete(id);
  }
}
