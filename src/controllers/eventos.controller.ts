import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { EventosService } from '../services/eventos.service';
import { Evento } from '../schemas/evento.schema';
import MongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';
import { CreateEventoDto, UpdateEventoDto } from '../dtos/evento.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('eventos')
@UseInterceptors(MongooseClassSerializerInterceptor(Evento))
export class EventosController {
  constructor(private readonly eventosService: EventosService) { }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createEventoDto: CreateEventoDto) {
    return this.eventosService.create(createEventoDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.eventosService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: string) {
    return this.eventosService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateEventoDto: UpdateEventoDto) {
    return this.eventosService.update(id, updateEventoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.eventosService.delete(id);
  }
}
