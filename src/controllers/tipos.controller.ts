import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { TiposService } from '../services/tipos.service';
import { Tipo } from '../schemas/tipo.schema';
import MongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';
import { CreateTipoDto, UpdateTipoDto } from '../dtos/tipo.dto';
import { AuthModule } from 'src/modules/auth.module';

@Controller('tipos')
@UseInterceptors(MongooseClassSerializerInterceptor(Tipo))
export class TiposController {
  constructor(private readonly tiposService: TiposService) { }

  @Post()
  @UseGuards(AuthModule)
  create(@Body() createTipoDto: CreateTipoDto) {
    return this.tiposService.create(createTipoDto);
  }

  @Get()
  @UseGuards(AuthModule)
  findAll() {
    return this.tiposService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthModule)
  findById(@Param('id') id: string) {
    return this.tiposService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AuthModule)
  update(@Param('id') id: string, @Body() updateTipoDto: UpdateTipoDto) {
    return this.tiposService.update(id, updateTipoDto);
  }

  @Delete(':id')
  @UseGuards(AuthModule)
  delete(@Param('id') id: string) {
    return this.tiposService.delete(id);
  }
}
