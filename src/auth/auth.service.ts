import { Inject, Injectable } from '@nestjs/common';
import { RegistrDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { UsersService } from '../users/users.service.js';
import bcrypt from 'bcrypt';
import { ERROR_MESSAGES } from '../common/constants/messages.js';
import { JwtService } from '@nestjs/jwt';
import JwtPayloadInterface from '../common/interfaces/jwt.payload.inerface.js';

@Injectable()
export class AuthService {
  constructor(
    private usersServis: UsersService,
    private jwtService: JwtService
  ) { }

  async register(registerDto: RegistrDto) {
    const newUser = await this.usersServis.create(registerDto);
    const accessToken = this.generateToken({
      sub: newUser.id,
      mobile: newUser.mobile,
      name: newUser.name
    })
    return { user: newUser, accessToken };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersServis.findOneByMobile(loginDto.mobile);
    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      throw ERROR_MESSAGES.AUTH.invalidCredentials;
    }

    const accessToken = this.generateToken({
      sub: user.id,
      mobile: user.mobile,
      name: user.name
    })

    return { user, accessToken };
  }

  private generateToken(payload: JwtPayloadInterface) {
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }
}
