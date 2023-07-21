import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../dtos/usuario.dto';
import { Usuario, UsuarioDocument } from '../schemas/usuario.schema';
import { EmpresasService } from 'src/services/empresas.service';
import { PerfilesService } from 'src/services/perfiles.service';
import { HttpBadRequest, HttpMongoError, HttpNotFound } from 'src/utils/http.exception';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name)
    private readonly usuarioModel: Model<UsuarioDocument>,
    private readonly empresasService: EmpresasService,
    @Inject(forwardRef(() => PerfilesService))
    private readonly perfilesService: PerfilesService,
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto) {
    await this.verifyEmpresaPerfil(createUsuarioDto.empresa, createUsuarioDto.perfil);
    createUsuarioDto.contrasena = await hash(createUsuarioDto.contrasena, 10);
    return await this.usuarioModel.create(createUsuarioDto).catch(() => HttpMongoError(Usuario.name));
  }

  private async verifyEmpresaPerfil(empresa: string, perfil: string) {
    const checkEmpresa = await this.empresasService.findById(empresa);
    const checkPerfil = await this.perfilesService.findById(perfil);
    if (checkPerfil.empresa.toString() != checkEmpresa._id.toString())
      HttpBadRequest(Usuario.name);
  }

  async findAll() {
    return await this.usuarioModel.find({ isActive: true });
  }

  async findById(id: string) {
    return await this.usuarioModel.findById(id) || HttpNotFound(Usuario.name);
  }

  async findByCedula(cedula: number) {
    return await this.usuarioModel.findOne({ cedula: cedula }) || HttpNotFound(Usuario.name);
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    return await this.usuarioModel.findByIdAndUpdate(id, updateUsuarioDto, { new: true }) || HttpNotFound(Usuario.name);
  }

  async delete(id: string) {
    return await this.usuarioModel.findByIdAndUpdate(id, { isActive: false }, { new: true }) || HttpNotFound(Usuario.name);
  }
}
