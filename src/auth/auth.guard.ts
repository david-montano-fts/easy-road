import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PerfilesService } from 'src/services/perfiles.service';
import { HttpUnauthorized } from 'src/utils/http.exception';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly perfilesService: PerfilesService
  ) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const payload = await this.verifyToken(token);
    const recursos = await this.getRecursos(payload.perfil);
    const path = this.getPath(request.route.path);
    await this.validatePathRecursos(path, recursos);
    request.user = payload;
    return true;
  }

  private getPath(routePath: string) {
    if (routePath.includes(':')) {
      const newPath = routePath.split(':')[0];
      return newPath.substring(0, newPath.length - 1);
    }
    return routePath;
  }

  private async getRecursos(perfil: string) {
    return await this.perfilesService.findByIdAndGetResouces(perfil);
  }

  private async validatePathRecursos(path: string, recursos: string[]) {
    recursos.find(rec => rec === path) || HttpUnauthorized('Recurso');
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : HttpUnauthorized('Jwt');
  }

  private async verifyToken(token: string) {
    return await this.jwtService.verifyAsync(token);
  }
}
