import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEstadoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}

export class UpdateEstadoDto extends PartialType(CreateEstadoDto) {}
