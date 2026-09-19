import { IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import RoleUserEnum from "../../common/enums/RoleUser.js";
import { Match } from "../../common/validators/match.validator.js";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^09\d{9}$/, { message: 'شماره تماس معتبر نمی باشد.' })
    mobile: string;

    @IsOptional()
    @IsEnum(RoleUserEnum)
    role: RoleUserEnum;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(24)
    password:string;

    @IsNotEmpty()
    @Match('password')    
    confirmPassword:string;
}
