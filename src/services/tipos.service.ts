import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tipo, TipoDocument } from '../schemas/tipo.schema';
import { CreateTipoDto, UpdateTipoDto } from '../dtos/tipo.dto';
import { HttpMongoError, HttpNotFound } from 'src/utils/http.exception';

@Injectable()
export class TiposService {
  constructor(
    @InjectModel(Tipo.name)
    private readonly tipoModel: Model<TipoDocument>,
  ) { }

  async create(createTipoDto: CreateTipoDto) {
    return await this.tipoModel.create(createTipoDto).catch(() => HttpMongoError(Tipo.name));
  }

  async findAll() {
    return await this.tipoModel.find({ isActive: true });
  }

  async findById(id: string) {
    return await this.tipoModel.findById(id) || HttpNotFound(Tipo.name);
  }

  async update(id: string, updateTipoDto: UpdateTipoDto) {
    return await this.tipoModel.findByIdAndUpdate(id, updateTipoDto, { new: true }) || HttpNotFound(Tipo.name);
  }

  async delete(id: string) {
    return await this.tipoModel.findByIdAndUpdate(id, { isActive: false }, { new: true }) || HttpNotFound(Tipo.name);;
  }
}
