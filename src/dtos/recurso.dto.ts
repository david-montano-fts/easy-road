import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecursoDto {
  @IsString()
  @IsNotEmpty()
  path: string;
}

export class UpdateRecursoDto extends PartialType(CreateRecursoDto) {}
