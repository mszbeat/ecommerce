import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';

export class UpdateUserDto extends PartialType(
    OmitType(CreateUserDto, ['confirmPassword', 'password', 'mobile']),
) { }



