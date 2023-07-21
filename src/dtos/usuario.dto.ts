import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsNumber()
  @IsNotEmpty()
  cedula: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsNotEmpty()
  contrasena: string;

  @IsMongoId()
  @IsNotEmpty()
  perfil: string;

  @IsMongoId()
  @IsNotEmpty()
  empresa: string;
}

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}

export class LoginDto {
  @IsNumber()
  @IsNotEmpty()
  cedula: number;

  @IsString()
  @IsNotEmpty()
  contrasena: string;
}