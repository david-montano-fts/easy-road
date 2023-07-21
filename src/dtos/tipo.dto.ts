import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}

export class UpdateTipoDto extends PartialType(CreateTipoDto) {}
