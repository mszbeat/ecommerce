import { Inject, Injectable } from '@nestjs/common';
import { RegistrDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { UsersService } from '../users/users.service.js';
import bcrypt from 'bcrypt';
import { ERROR_MESSAGES } from '../common/constants/messages.js';

@Injectable()
export class AuthService {
  constructor(
    @Inject()
    private usersServis: UsersService
  ) { }

  async register(registerDto: RegistrDto) {
    const newUser = await this.usersServis.create(registerDto);
    return newUser;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersServis.findOneByMobile(loginDto.mobile);
    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      throw ERROR_MESSAGES.AUTH.invalidCredentials;
    }

    // generate token...
    
    return `This action returns all auth`;
  }
}
