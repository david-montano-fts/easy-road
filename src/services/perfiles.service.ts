import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Perfil, PerfilDocument } from '../schemas/perfil.schema';
import { CreatePerfilDto, UpdatePerfilDto, PerfilRecursosDto } from '../dtos/perfil.dto';
import { RecursosService } from '../services/recursos.service';
import { HttpMongoError, HttpNotFound } from '../utils/http.exception';
import { EmpresasService } from './empresas.service';
import path from 'path';

@Injectable()
export class PerfilesService {
  constructor(
    @InjectModel(Perfil.name)
    private readonly perfilModel: Model<PerfilDocument>,
    private readonly empresasService: EmpresasService,
    private readonly recursosService: RecursosService,
  ) { }

  async create(createPerfilDto: CreatePerfilDto) {
    await this.verifyEmpresaExists(createPerfilDto.empresa);
    return await this.perfilModel.create(createPerfilDto).catch(() => HttpMongoError(Perfil.name));
  }

  async relateResources(perfilRecursosDto: PerfilRecursosDto) {
    await this.verifyPerfilExists(perfilRecursosDto.perfil);
    await this.verifyRecursosExists(perfilRecursosDto.recursos);
    return await this.perfilModel.updateOne(
      { _id: perfilRecursosDto.perfil },
      { $addToSet: { recursos: { $each: perfilRecursosDto.recursos } } },
    );
  }

  async unbindResources(perfilRecursosDto: PerfilRecursosDto) {
    await this.verifyPerfilExists(perfilRecursosDto.perfil);
    await this.verifyRecursosExists(perfilRecursosDto.recursos);
    return await this.perfilModel.updateOne(
      { _id: perfilRecursosDto.perfil },
      { $pull: { recursos: { $each: perfilRecursosDto.recursos } } },
    );
  }

  private async verifyEmpresaExists(empresa: string) {
    await this.empresasService.findById(empresa);
  }

  private async verifyPerfilExists(perfil: string) {
    await this.findById(perfil);
  }

  private async verifyRecursosExists(recursos: string[]) {
    const verifyPromises = recursos.map(async (recurso) => {
      await this.recursosService.findById(recurso);
    });
    await Promise.all(verifyPromises);
  }

  async findAll() {
    return await this.perfilModel.find({ isActive: true });
  }

  async findByIdAndGetResouces(id: string) {
    return await this.perfilModel.findById(id).select('recursos').populate({ path: 'recursos', select: 'path' }).exec().then(pfl => pfl?.recursos.map((rec : any) => rec.path)) || HttpNotFound(Perfil.name);
  }

  async findById(id: string) {
    return await this.perfilModel.findById(id) || HttpNotFound(Perfil.name);
  }

  async update(id: string, updatePerfilDto: UpdatePerfilDto) {
    return await this.perfilModel.findByIdAndUpdate(id, updatePerfilDto, { new: true }) || HttpNotFound(Perfil.name);
  }

  async delete(id: string) {
    return await this.perfilModel.findByIdAndUpdate(id, { isActive: false }, { new: true }) || HttpNotFound(Perfil.name);
  }
}
