import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth.module';
import { ProyectosModule } from './modules/proyectos.module';
import { PostesModule } from './modules/postes.module';
import { EventosModule } from './modules/eventos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB.URI'),
      }),
    }),
    AuthModule,
    ProyectosModule,
    PostesModule,
    EventosModule,
  ],
})
export class AppModule { }
