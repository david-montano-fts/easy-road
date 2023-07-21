import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Recurso, RecursoSchema } from '../schemas/recurso.schema';
import { RecursosController } from '../controllers/recursos.controller';
import { RecursosService } from '../services/recursos.service';
import { AuthModule } from './auth.module';
import { PerfilesModule } from './perfiles.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Recurso.name,
        schema: RecursoSchema,
      },
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => PerfilesModule)
  ],
  controllers: [RecursosController],
  providers: [RecursosService],
  exports: [RecursosService],
})
export class RecursosModule { }
