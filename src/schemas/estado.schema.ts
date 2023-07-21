import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';

export type EstadoDocument = Estado & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Estado {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop({ default: true })
  @Exclude()
  isActive: boolean;
}

export const EstadoSchema = SchemaFactory.createForClass(Estado);
