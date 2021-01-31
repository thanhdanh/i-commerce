import { Inject, UnauthorizedException } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ClientProxy } from "@nestjs/microservices";
import { AccessTokenPayload, LoginUserInput } from "./dto/login.dto";
import { AuthService } from "./auh.service";
import { timeout } from "rxjs/operators";

@Resolver()
export class AuthResolver {
    constructor(
        @Inject('TRANSPORT_SERVICE') private readonly transportServiceClient: ClientProxy,
        private readonly authService: AuthService,
    ) {}
    
    @Mutation(returns => AccessTokenPayload, { name: 'login' })
    async login(@Args('data') loginData: LoginUserInput) {
        const result = await this.transportServiceClient.send('login_by_credential', loginData).pipe(timeout(5000)).toPromise();
        if (!result || !result.success) {
            throw new UnauthorizedException();
        }

        const accessToken = await this.authService.generateAccessToken(result.user);
        return {
            accessToken,
        }
    }
}