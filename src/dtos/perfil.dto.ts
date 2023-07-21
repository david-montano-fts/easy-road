import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreatePerfilDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsMongoId()
  @IsNotEmpty()
  empresa: string;
}

export class UpdatePerfilDto extends PartialType(CreatePerfilDto) {}

export class PerfilRecursosDto {
  @IsMongoId()
  @IsNotEmpty()
  perfil: string;

  @IsArray()
  @IsNotEmpty()
  @IsMongoId({ each: true })
  recursos: string[];
}
