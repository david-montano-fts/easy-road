import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Estado, EstadoDocument } from '../schemas/estado.schema';
import { CreateEstadoDto, UpdateEstadoDto } from '../dtos/estado.dto';
import { HttpMongoError, HttpNotFound } from 'src/utils/http.exception';

@Injectable()
export class EstadosService {
  constructor(
    @InjectModel(Estado.name)
    private readonly estadoModel: Model<EstadoDocument>,
  ) { }

  async create(createEstadoDto: CreateEstadoDto) {
    return await this.estadoModel.create(createEstadoDto).catch(() => HttpMongoError(Estado.name));
  }

  async findAll() {
    return await this.estadoModel.find({ isActive: true });
  }

  async findById(id: string) {
    return await this.estadoModel.findById(id) || HttpNotFound(Estado.name);
  }

  async update(id: string, updateEstadoDto: UpdateEstadoDto) {
    return await this.estadoModel.findByIdAndUpdate(id, updateEstadoDto, { new: true }) || HttpNotFound(Estado.name);
  }

  async delete(id: string) {
    return await this.estadoModel.findByIdAndUpdate(id, { isActive: false }, { new: true }) || HttpNotFound(Estado.name);;
  }
}
