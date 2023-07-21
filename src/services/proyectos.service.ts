import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proyecto, ProyectoDocument } from '../schemas/proyecto.schema';
import { CreateProyectoDto, UpdateProyectoDto, ProyectoUsuariosDto } from '../dtos/proyecto.dto';
import { UsuariosService } from 'src/services/usuarios.service';
import { HttpMongoError, HttpNotFound } from 'src/utils/http.exception';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectModel(Proyecto.name)
    private readonly proyectoModel: Model<ProyectoDocument>,
    private readonly usuariosService: UsuariosService,
  ) { }

  async create(user: any, createProyectoDto: CreateProyectoDto) {
    return await this.proyectoModel.create({ ...createProyectoDto, empresa: user.empresa }).catch(() => HttpMongoError(Proyecto.name));
  }

  async relateUsuarios(proyectoUsuariosDto: ProyectoUsuariosDto) {
    await this.verifyProyectoExists(proyectoUsuariosDto.proyecto);
    await this.verifyUsuariosExists(proyectoUsuariosDto.usuarios);
    return await this.proyectoModel.updateOne(
      { _id: proyectoUsuariosDto.proyecto },
      { $addToSet: { usuarios: { $each: proyectoUsuariosDto.usuarios } } },
    );
  }

  async unbindUsuarios(proyectoUsuariosDto: ProyectoUsuariosDto) {
    await this.verifyProyectoExists(proyectoUsuariosDto.proyecto);
    await this.verifyUsuariosExists(proyectoUsuariosDto.usuarios);
    return await this.proyectoModel.updateOne(
      { _id: proyectoUsuariosDto.proyecto },
      { $pull: { usuarios: { $each: proyectoUsuariosDto.usuarios } } },
    );
  }

  private async verifyProyectoExists(proyecto: string) {
    await this.findById(proyecto);
  }

  private async verifyUsuariosExists(usuarios: string[]) {
    const verifyPromises = usuarios.map(async (usuario) => {
      await this.usuariosService.findById(usuario);
    });
    await Promise.all(verifyPromises);
  }

  async findAll() {
    return await this.proyectoModel.find({ isActive: true });
  }

  async findById(id: string) {
    return await this.proyectoModel.findById(id) || HttpNotFound(Proyecto.name);
  }

  async update(id: string, updateProyectoDto: UpdateProyectoDto) {
    return await this.proyectoModel.findByIdAndUpdate(id, updateProyectoDto, { new: true }) || HttpNotFound(Proyecto.name);
  }

  async delete(id: string) {
    return await this.proyectoModel.findByIdAndUpdate(id, { isActive: false }, { new: true }) || HttpNotFound(Proyecto.name);
  }
}
