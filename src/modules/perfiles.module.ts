import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Perfil, PerfilSchema } from '../schemas/perfil.schema';
import { PerfilesController } from '../controllers/perfiles.controller';
import { PerfilesService } from '../services/perfiles.service';
import { AuthModule } from 'src/modules/auth.module';
import { RecursosModule } from './recursos.module';
import { EmpresasModule } from './empresas.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Perfil.name,
        schema: PerfilSchema,
      },
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => EmpresasModule),
    forwardRef(() => RecursosModule)
  ],
  controllers: [PerfilesController],
  providers: [PerfilesService],
  exports: [PerfilesService],
})
export class PerfilesModule { }
