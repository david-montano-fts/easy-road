import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Tipo } from './tipo.schema';
import { Poste } from './poste.schema';

export type EventoDocument = Evento & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Evento {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  @Prop({ required: true })
  description: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: Tipo.name, required: true })
  @Transform(({ value }) => value.toString())
  tipo: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Poste.name, required: true })
  @Transform(({ value }) => value.toString())
  poste: Types.ObjectId;

  @Prop({ default: true })
  @Exclude()
  isActive: boolean;
}

export const EventoSchema = SchemaFactory.createForClass(Evento);
