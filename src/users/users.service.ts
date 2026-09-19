import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { QueryUsersDto } from './dto/query.users.dto.js';
import { UUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isDoplicateUser = await this.userRepo.exists({ where: { mobile: createUserDto.mobile } });
    if (isDoplicateUser) {
      throw new ConflictException('این شماره تماس قبلا ثبت نام شده است.');
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 12)
    const newUser = this.userRepo.create({
      ...createUserDto,
      password: hashPassword
    });

    return this.userRepo.save(newUser);
  }

  findAll(query: QueryUsersDto): Promise<User[]> {
    const { limit = 10, page = 1 } = query;
    const queryBiulder = this.userRepo.createQueryBuilder('user')
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('user.createAt', 'DESC')
    return queryBiulder.getMany();
  }

  async findOneById(id: UUID): Promise<User> {
    const user = await this.userRepo.findOneBy({ id })
    if (!user) {
      throw new NotFoundException(`کاربری با شناسه ${id} پیدا نشد.`)
    }
    return user;
  }

  async findOneByMobile(mobile: string) {
    const user = await this.userRepo.findOneBy({ mobile });
    if (!user) {
      throw new NotFoundException(`کابری با شماره تماس ${mobile} وجود ندارد.`)
    }
    return user;
  }

  async update(id: UUID, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    Object.assign(user, updateUserDto);
    return this.userRepo.save(user);
  }

  async remove(id: UUID): Promise<void> {
    await this.findOneById(id);
    await this.userRepo.delete({ id });
  }
}
