import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Poste, PosteDocument } from '../schemas/poste.schema';
import { CreatePosteDto, UpdatePosteDto } from '../dtos/poste.dto';
import { HttpMongoError, HttpNotFound } from '../utils/http.exception';
import { EstadosService } from './estados.service';
import { ProyectosService } from './proyectos.service';

@Injectable()
export class PostesService {
  constructor(
    @InjectModel(Poste.name)
    private readonly posteModel: Model<PosteDocument>,
    private readonly estadosService: EstadosService,
    private readonly proyectosService: ProyectosService
  ) { }

  async create(createPosteDto: CreatePosteDto) {
    await this.verifyEstadoExist(createPosteDto.estado);
    await this.verifyProyectoExist(createPosteDto.proyecto);
    return await this.posteModel.create(createPosteDto).catch(() => HttpMongoError(Poste.name));
  }

  private async verifyEstadoExist(estado: string) {
    await this.estadosService.findById(estado);
  }

  private async verifyProyectoExist(proyecto: string) {
    await this.proyectosService.findById(proyecto);
  }

  async findAll() {
    return await this.posteModel.find({ isActive: true });
  }

  async findById(id: string) {
    return await this.posteModel.findById(id) || HttpNotFound(Poste.name);
  }

  async update(id: string, updatePosteDto: UpdatePosteDto) {
    return await this.posteModel.findByIdAndUpdate(id, updatePosteDto, { new: true }) || HttpNotFound(Poste.name);
  }

  async delete(id: string) {
    return await this.posteModel.findByIdAndUpdate(id, { isActive: false }, { new: true }) || HttpNotFound(Poste.name);
  }
}
