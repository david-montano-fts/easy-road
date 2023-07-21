import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document, SchemaTypes } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Empresa } from './empresa.schema';
import { Recurso } from './recurso.schema';

export type PerfilDocument = Perfil & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Perfil {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop({ default: true })
  @Exclude()
  isActive: boolean;

  @Prop({ type: SchemaTypes.ObjectId, ref: Empresa.name, required: true })
  @Transform(({ value }) => value.toString())
  empresa: Types.ObjectId;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: Recurso.name }] })
  @Transform(({ value }) => value.toString())
  recursos: Types.ObjectId[];
}

export const PerfilSchema = SchemaFactory.createForClass(Perfil);
