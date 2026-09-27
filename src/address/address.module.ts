import { Module } from '@nestjs/common';
import { AddressService } from './address.service.js';
import { AddressController } from './address.controller.js';
import { UsersModule } from '../users/users.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity.js';

@Module({
  imports:[
    TypeOrmModule.forFeature([Address]),
    UsersModule
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
