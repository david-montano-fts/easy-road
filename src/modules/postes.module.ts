import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostesService } from 'src/services/postes.service';
import { PostesController } from 'src/controllers/postes.controller';
import { Poste, PosteSchema } from 'src/schemas/poste.schema';
import { ProyectosModule } from './proyectos.module';
import { EstadosModule } from './estados.module';
import { AuthModule } from './auth.module';
import { PerfilesModule } from './perfiles.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Poste.name,
        schema: PosteSchema,
      },
    ]),
    AuthModule,
    PerfilesModule,
    ProyectosModule,
    EstadosModule
  ],
  controllers: [PostesController],
  providers: [PostesService],
  exports: [PostesService],
})
export class PostesModule { }
