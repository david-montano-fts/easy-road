import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmpresasService } from '../services/empresas.service';
import { EmpresasController } from '../controllers/empresas.controller';
import { Empresa, EmpresaSchema } from '../schemas/empresa.schema';
import { AuthModule } from './auth.module';
import { PerfilesModule } from './perfiles.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Empresa.name,
        schema: EmpresaSchema,
      },
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => PerfilesModule)
  ],
  controllers: [EmpresasController],
  providers: [EmpresasService],
  exports: [EmpresasService],
})
export class EmpresasModule {}
