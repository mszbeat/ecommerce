import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../users/dto/create-user.dto.js';

export class RegistrDto extends OmitType(CreateUserDto,['role']){}
