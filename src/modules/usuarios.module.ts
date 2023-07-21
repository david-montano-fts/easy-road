import { Module, forwardRef } from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service';
import { UsuariosController } from '../controllers/usuarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from '../schemas/usuario.schema';
import { EmpresasModule } from 'src/modules/empresas.module';
import { PerfilesModule } from 'src/modules/perfiles.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Usuario.name,
        schema: UsuarioSchema,
      },
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => PerfilesModule),
    forwardRef(() => EmpresasModule),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
