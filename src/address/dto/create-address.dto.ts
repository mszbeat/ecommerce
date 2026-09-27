import { IsNotEmpty, IsOptional, IsString, length, Length, Matches } from "class-validator";


export class CreateAddressDto {
    @IsString()
    @IsNotEmpty()
    privince: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @Length(10, 10)
    postal_code: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^09\d{9}$/, { message: 'شماره تماس گیرنده معتبر نمی باشد.' })
    reciver_mobile: string;

    @IsString()
    @IsOptional()
    @Length(1, 1000)
    description: string;
}
