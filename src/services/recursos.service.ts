import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recurso, RecursoDocument } from '../schemas/recurso.schema';
import { CreateRecursoDto, UpdateRecursoDto } from '../dtos/recurso.dto';
import { HttpMongoError, HttpNotFound } from '../utils/http.exception';

@Injectable()
export class RecursosService {
  constructor(
    @InjectModel(Recurso.name)
    private readonly recursoModel: Model<RecursoDocument>,
  ) { }

  async create(createRecursoDto: CreateRecursoDto) {
    return await this.recursoModel.create(createRecursoDto).catch(() => HttpMongoError(Recurso.name));
  }

  async findAll() {
    return await this.recursoModel.find({ isActive: true });
  }

  async findById(id: string) {
    return await this.recursoModel.findById(id) || HttpNotFound(Recurso.name);
  }

  async update(id: string, updateRecursoDto: UpdateRecursoDto) {
    return await this.recursoModel.findByIdAndUpdate(id, updateRecursoDto, { new: true }) || HttpNotFound(Recurso.name);
  }

  async delete(id: string) {
    return await this.recursoModel.findByIdAndUpdate(id, { isActive: false }, { new: true }) || HttpNotFound(Recurso.name);
  }
}
