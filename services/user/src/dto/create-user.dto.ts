import { IsNotEmpty, IsOptional, IsBoolean, MaxLength, Min } from 'class-validator';

export class CreateUserDTO {
    @Min(6)
    @MaxLength(30)
    @IsNotEmpty()
    username: string;

    @Min(8)
    @IsNotEmpty()
    password: string;

    @IsOptional()
    @IsBoolean()
    isAdmin: boolean = false;

    @IsOptional()
    @IsBoolean()
    isActive: boolean = true;
}