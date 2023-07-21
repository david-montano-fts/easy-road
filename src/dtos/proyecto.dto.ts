import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateProyectoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  descripcion: string;
}

export class UpdateProyectoDto extends PartialType(CreateProyectoDto) {}

export class ProyectoUsuariosDto {
  @IsMongoId()
  @IsNotEmpty()
  proyecto: string;

  @IsArray()
  @IsNotEmpty()
  @IsMongoId({ each: true })
  usuarios: string[];
}
