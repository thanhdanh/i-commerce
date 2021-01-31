import { Inject } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ClientProxy } from "@nestjs/microservices";
import { isNil } from "src/utils/common.util";
import { AccessTokenPayload, LoginUserInput } from "./dto/login.dto";
import { compare } from 'bcryptjs'
import { AuthService } from "./auh.service";
import { timeout } from "rxjs/operators";

@Resolver()
export class AuthResolver {
    constructor(
        @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
        private readonly authService: AuthService,
    ) {}
    
    @Mutation(returns => AccessTokenPayload)
    async login(@Args('data') data: LoginUserInput) {
        const user = await this.userServiceClient.send('get_user', data.username).pipe(timeout(5000)).toPromise();
        if (isNil(user)) throw new Error('Login failed');

        const checkPass: boolean = await compare(data.password, user.password);
        if (!checkPass) throw new Error('Login failed');

        if (!user.active) throw new Error('User is disabled');

        const accessToken = await this.authService.generateAccessToken(user);
        return {
            accessToken,
        }
    }
}