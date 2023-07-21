import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Estado, EstadoSchema } from '../schemas/estado.schema';
import { EstadosController } from '../controllers/estados.controller';
import { EstadosService } from '../services/estados.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Estado.name,
        schema: EstadoSchema,
      },
    ]),
    AuthModule
  ],
  controllers: [EstadosController],
  providers: [EstadosService],
  exports: [EstadosService],
})
export class EstadosModule {}
