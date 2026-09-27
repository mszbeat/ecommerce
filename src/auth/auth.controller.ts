import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegistrDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() registerDto: RegistrDto) {
    const result = await this.authService.register(registerDto);
    return {
      message: "با موفقیت وارد شدید.",
      data: result
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return {
      message: "با موفقیت وارد شدید.",
      data: result
    };
  }


}
