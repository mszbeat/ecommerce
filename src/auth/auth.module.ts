import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../users/users.module.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[UsersModule,
    ConfigModule.forRoot({
      isGlobal:true
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
