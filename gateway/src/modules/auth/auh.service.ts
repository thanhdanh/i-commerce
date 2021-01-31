import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { User } from "./models/user.model";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
    ) { }

    async generateAccessToken(user: User): Promise<string> {
        return this.jwtService.sign(
            {
                sub: user.id,
                username: user.username,
                isAdmin: user.isAdmin,
            },
        )
    }
}