import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';

export type RecursoDocument = Recurso & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Recurso {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  path: string;

  @Prop({ default: true })
  @Exclude()
  isActive: boolean;
}

export const RecursoSchema = SchemaFactory.createForClass(Recurso);
