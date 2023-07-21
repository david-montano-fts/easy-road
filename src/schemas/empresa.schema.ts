import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';

export type EmpresaDocument = Empresa & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Empresa {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop({ default: true })
  @Exclude()
  isActive: boolean;
}

export const EmpresaSchema = SchemaFactory.createForClass(Empresa);
