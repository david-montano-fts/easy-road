import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Evento, EventoDocument } from '../schemas/evento.schema';
import { CreateEventoDto, UpdateEventoDto } from '../dtos/evento.dto';
import { TiposService } from 'src/services/tipos.service';
import { PostesService } from './postes.service';
import { HttpMongoError, HttpNotFound } from 'src/utils/http.exception';

@Injectable()
export class EventosService {
  constructor(
    @InjectModel(Evento.name)
    private readonly eventosModel: Model<EventoDocument>,
    private readonly postesService: PostesService,
    private readonly tiposService: TiposService,
  ) { }

  async create(createEventoDto: CreateEventoDto) {
    await this.verifyPosteExists(createEventoDto.poste);
    await this.verifyTipoExists(createEventoDto.tipo);
    return await this.eventosModel.create(createEventoDto).catch(() => HttpMongoError(Evento.name));
  }

  private async verifyPosteExists(poste: string) {
    await this.postesService.findById(poste);
  }

  private async verifyTipoExists(tipo: string) {
    await this.tiposService.findById(tipo);
  }

  async findAll() {
    return await this.eventosModel.find({ isActive: true });
  }

  async findById(id: string) {
    return await this.eventosModel.findById(id) || HttpNotFound(Evento.name);
  }

  async update(id: string, updateEventoDto: UpdateEventoDto) {
    return await this.eventosModel.findByIdAndUpdate(id, updateEventoDto, { new: true }) || HttpNotFound(Evento.name);
  }

  async delete(id: string) {
    return await this.eventosModel.findByIdAndUpdate(id, { isActive: false }, { new: true }) || HttpNotFound(Evento.name);
  }
}
