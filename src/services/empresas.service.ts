import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Empresa, EmpresaDocument } from '../schemas/empresa.schema';
import { CreateEmpresaDto, UpdateEmpresaDto } from '../dtos/empresa.dto';
import { HttpMongoError, HttpNotFound } from 'src/utils/http.exception';

@Injectable()
export class EmpresasService {
  constructor(
    @InjectModel(Empresa.name)
    private readonly empresaModel: Model<EmpresaDocument>,
  ) { }

  async create(createEmpresaDto: CreateEmpresaDto) {
    return await this.empresaModel.create(createEmpresaDto).catch(() => HttpMongoError(Empresa.name));
  }

  async findAll() {
    return await this.empresaModel.find({ isActive: { $eq: true } });
  }

  async findById(id: string) {
    return await this.empresaModel.findById(id) || HttpNotFound(Empresa.name);
  }

  async update(id: string, updateEmpresaDto: UpdateEmpresaDto) {
    return await this.empresaModel.findByIdAndUpdate(id, updateEmpresaDto, { new: true }) || HttpNotFound(Empresa.name);
  }

  async delete(id: string) {
    return await this.empresaModel.findByIdAndUpdate(id, { isActive: false }, { new: true }) || HttpNotFound(Empresa.name);
  }
}
