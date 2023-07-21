import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventoDto {
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsMongoId()
  @IsNotEmpty()
  tipo: string;

  @IsMongoId()
  @IsNotEmpty()
  poste: string;
}

export class UpdateEventoDto extends PartialType(CreateEventoDto) {}
