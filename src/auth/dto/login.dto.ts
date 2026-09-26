import { OmitType } from '@nestjs/mapped-types';
import { RegistrDto } from './register.dto.js';
export class LoginDto extends OmitType(RegistrDto,['name','name','confirmPassword']) {}
