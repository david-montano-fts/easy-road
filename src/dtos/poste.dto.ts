import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreatePosteDto {
  @IsString()
  @IsNotEmpty()
  serial: string;

  @IsMongoId()
  @IsNotEmpty()
  proyecto: string;

  @IsMongoId()
  @IsNotEmpty()
  estado: string;

  @IsString()
  fabricante: string;

  @IsString()
  modelo: string;

  @IsString()
  imei: string;

  @IsString()
  numeroSim: string;

  @IsString()
  nivelSenal: string;

  @IsString()
  registro: string;

  @IsString()
  operador: string;

  @IsString()
  bateria: string;

  @IsString()
  tamper: string;

  @IsString()
  panelSolar: string;

  @IsString()
  emergenciaSim: string;
}

export class UpdatePosteDto extends PartialType(CreatePosteDto) {}