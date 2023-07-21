import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from '../dtos/usuario.dto';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../utils/user.decorator';

@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async logIn(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@User() user: any) {
    return user;
  }
}
