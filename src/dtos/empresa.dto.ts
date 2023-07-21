import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmpresaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}

export class UpdateEmpresaDto extends PartialType(CreateEmpresaDto) {}
