import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Proyecto } from './proyecto.schema';
import { Estado } from './estado.schema';

export type PosteDocument = Poste & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Poste {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true, unique: true })
  serial: string;

  @Prop({ default: true })
  @Exclude()
  isActive: boolean;

  @Prop({ type: SchemaTypes.ObjectId, ref: Proyecto.name, required: true })
  @Transform(({ value }) => value.toString())
  proyecto: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Estado.name, required: true })
  @Transform(({ value }) => value.toString())
  estado: Types.ObjectId;

  @Prop()
  fabricante: string;

  @Prop()
  modelo: string;

  @Prop()
  imei: string;

  @Prop()
  numeroSim: string;

  @Prop()
  nivelSenal: string;

  @Prop()
  registro: string;

  @Prop()
  operador: string;

  @Prop()
  bateria: string;

  @Prop()
  tamper: string;

  @Prop()
  panelSolar: string;

  @Prop()
  emergenciaSim: string;
}

export const PosteSchema = SchemaFactory.createForClass(Poste);
