import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/services/usuarios.service';
import { LoginDto } from '../dtos/usuario.dto';
import { compare } from 'bcrypt';
import { HttpUnauthorized } from 'src/utils/http.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UsuariosService))
    private readonly usuariosService: UsuariosService,
  ) { }

  async login(loginDto: LoginDto) {
    const user = await this.verifyUserCedula(loginDto.cedula);
    await this.verifyUserPassword(loginDto.contrasena, user.contrasena);
    return this.generateJWT({ sub: user._id, empresa: user.empresa, perfil: user.perfil });
  }

  private async verifyUserCedula(cedula: number) {
    return await this.usuariosService.findByCedula(cedula);
  }

  private async verifyUserPassword(contrasena: string, hashedContrasena: string) {
    return await compare(contrasena, hashedContrasena) || HttpUnauthorized('Usuario');
  }

  private generateJWT(payload: any) {
    return { access_token: this.jwtService.sign(payload) };
  }
}
