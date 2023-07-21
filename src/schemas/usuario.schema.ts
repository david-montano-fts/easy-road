import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document, SchemaTypes } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Perfil } from './perfil.schema';
import { Empresa } from './empresa.schema';

export type UsuarioDocument = Usuario & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Usuario {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  @Prop({ unique: true, required: true })
  cedula: number;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellido: string;

  @Prop({ required: true })
  correo: string;

  @Prop({ required: true })
  @Exclude()
  contrasena: string;

  @Prop({ default: true })
  @Exclude()
  isActive: boolean;

  @Prop({ type: SchemaTypes.ObjectId, ref: Perfil.name, required: true })
  @Transform(({ value }) => value.toString())
  perfil: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Empresa.name, required: true })
  @Transform(({ value }) => value.toString())
  empresa: Types.ObjectId;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
