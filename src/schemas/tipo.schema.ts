import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';

export type TipoDocument = Tipo & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Tipo {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop({ default: true })
  @Exclude()
  isActive: boolean;
}

export const TipoSchema = SchemaFactory.createForClass(Tipo);
