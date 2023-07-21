import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Proyecto, ProyectoSchema } from '../schemas/proyecto.schema';
import { ProyectosController } from '../controllers/proyectos.controller';
import { ProyectosService } from '../services/proyectos.service';
import { UsuariosModule } from 'src/modules/usuarios.module';
import { AuthModule } from 'src/modules/auth.module';
import { PerfilesModule } from './perfiles.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Proyecto.name,
        schema: ProyectoSchema,
      },
    ]),
    AuthModule,
    UsuariosModule,
    PerfilesModule
  ],
  controllers: [ProyectosController],
  providers: [ProyectosService],
  exports: [ProyectosService],
})
export class ProyectosModule { }
