import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UserDto } from "./dto/user.dto";

@Injectable()
export class AuthService {
    constructor(
        @Inject('JwtAccessTokenService') private readonly accessTokenService: JwtService,
    ) { }

    async generateAccessToken(user: UserDto): Promise<string> {
        return this.accessTokenService.sign(
            {
                sub: user.username,
                isAdmin: user.isAdmin,
            },
        )
    }
}