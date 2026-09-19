import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class QueryUsersDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1
}