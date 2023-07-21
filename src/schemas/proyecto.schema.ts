import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document, SchemaTypes } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Empresa } from './empresa.schema';
import { Usuario } from './usuario.schema';

export type ProyectoDocument = Proyecto & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Proyecto {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop({ default: true })
  @Exclude()
  isActive: boolean;

  @Prop({ type: SchemaTypes.ObjectId, ref: Empresa.name, required: true })
  @Transform(({ value }) => value.toString())
  empresa: Types.ObjectId;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: Usuario.name }] })
  @Transform(({ value }) => value.toString())
  usuarios: Types.ObjectId[];
}

export const ProyectoSchema = SchemaFactory.createForClass(Proyecto);
