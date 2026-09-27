import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { QueryUsersDto } from './dto/query.users.dto.js';
import type { UUID } from 'crypto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    return {
      message: 'کاربر باموفقیت ساخته شد.',
      data: result
    };
  }

  @Get()
  async findAll(@Query() query: QueryUsersDto) {
    const result = await this.usersService.findAll(query);
    return {
      message: 'لیست کاربران باموفقیت دریافت شد.',
      data: result
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: UUID) {
    const result = await this.usersService.findOneById(id);
    return {
      message: 'اطلاعات کاربر باموفقیت دریافت شد.',
      data: result
    };
  }

  @Patch(':id')
  async update(@Param('id') id: UUID, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.usersService.update(id, updateUserDto);
    return {
      message: 'اطلاعات کاربر باموفقیت آپدیت شد.',
      data: result
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: UUID) {
    const result = await this.usersService.remove(id);
    return {
      message: 'کاربر باموفقیت حذف شد.',
      data: result
    };
  }
}
