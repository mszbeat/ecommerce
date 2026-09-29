import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import type { UUID } from "crypto";

export class CreateTicketDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    subject: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsUUID()
    replyTo: UUID;
}
