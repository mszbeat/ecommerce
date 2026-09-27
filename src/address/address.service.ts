import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto.js';
import { UpdateAddressDto } from './dto/update-address.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity.js';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service.js';
import { UUID } from 'crypto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
    private readonly userService: UsersService
  ) { }
  
  async create(createAddressDto: CreateAddressDto, userId: UUID): Promise<Address> {
    const user = await this.userService.findOneById(userId);
    const address = await this.addressRepo.create({ ...createAddressDto, user });
    return this.addressRepo.save(address);
  }

  async findAll(): Promise<Address[]> {
    return await this.addressRepo.find({ relations: { user: true } });
  }

  async findOne(id: UUID) {
    const address = await this.addressRepo.findOneBy({ id });
    if (!address) {
      throw new NotFoundException('آدرس مورد نظر یافت نشد.')
    }

    return address;
  }

  async update(id: UUID, updateAddressDto: UpdateAddressDto): Promise<Address> {
    const address = await this.findOne(id);
    Object.assign(address, updateAddressDto);

    return await this.addressRepo.save(address);
  }

  async remove(id: UUID): Promise<void> {
    await this.findOne(id);
    await this.addressRepo.delete({ id })
  }
}
