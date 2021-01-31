import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "src/schemas/user.schema";

export class LoginInput {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}

export class LoginOutput {
    @IsBoolean()
    success: boolean;

    @IsOptional()
    user?: User;
}