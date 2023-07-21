import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventosService } from '../services/eventos.service';
import { Evento, EventoSchema } from '../schemas/evento.schema';
import { EventosController } from '../controllers/eventos.controller';
import { TiposModule } from 'src/modules/tipos.module';
import { PostesModule } from './postes.module';
import { AuthModule } from './auth.module';
import { PerfilesModule } from './perfiles.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Evento.name,
        schema: EventoSchema,
      },
    ]),
    AuthModule,
    PerfilesModule,
    TiposModule,
    PostesModule
  ],
  controllers: [EventosController],
  providers: [EventosService],
  exports: [EventosService],
})
export class EventosModule { }
