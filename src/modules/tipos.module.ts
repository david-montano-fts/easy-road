import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tipo, TipoSchema } from '../schemas/tipo.schema';
import { TiposController } from '../controllers/tipos.controller';
import { TiposService } from '../services/tipos.service';
import { AuthModule } from './auth.module';
import { PerfilesModule } from './perfiles.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tipo.name,
        schema: TipoSchema,
      },
    ]),
    AuthModule,
    PerfilesModule
  ],
  controllers: [TiposController],
  providers: [TiposService],
  exports: [TiposService],
})
export class TiposModule {}
