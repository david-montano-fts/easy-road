import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import { UsuariosModule } from './usuarios.module';
import { PerfilesModule } from './perfiles.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT.SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT.EXPIRED'),
        },
      }),
    }),
    forwardRef(() => PerfilesModule),
    forwardRef(() => UsuariosModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [JwtModule],
})
export class AuthModule { }
