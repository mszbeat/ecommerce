import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AddressService } from './address.service.js';
import { CreateAddressDto } from './dto/create-address.dto.js';
import { UpdateAddressDto } from './dto/update-address.dto.js';
import type { UUID } from 'crypto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto, @Req() req: any) {
    const result = await this.addressService.create(createAddressDto, req.user.id);

    return {
      message: 'آدرس با موفقیت ساخته شد.',
      data: result
    }
  }

  @Get()
  async findAll() {
    const result = await this.addressService.findAll();

    return {
      message: 'آدرسها بازیابی شدند.',
      data: result
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: UUID) {
    const result = await this.addressService.findOne(id);

    return {
      message: 'آدرس بازیابی شد.',
      data: result
    }
  }

  @Patch(':id')
  async update(@Param('id') id: UUID, @Body() updateAddressDto: UpdateAddressDto) {
    const result = await this.addressService.update(id, updateAddressDto);

    return {
      message: 'آدرس آپدیت شد.',
      data: result
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: UUID) {
    await this.addressService.remove(id);

    return {
      message: 'آدرس حذف شد.',
    }
  }
}
