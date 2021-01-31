import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auh.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
    ],
    providers: [
        JwtStrategy,
        AuthResolver,
        {
            provide: 'TRANSPORT_SERVICE',
            useFactory: (configService: ConfigService) => {
                return ClientProxyFactory.create({
                    transport: Transport.REDIS,
                    options: {
                        url: configService.get<string>('REDIS_HOST'),
                    }
                });
            },
            inject: [ConfigService],
        },
        AuthService,
        {
            provide: 'JwtAccessTokenService',
            inject: [ConfigService],
            useFactory: (configService: ConfigService): JwtService => {
              return new JwtService({
                secret: configService.get<string>('JWT_ACCESSTOKEN_SECRET'),
                signOptions: {
                  expiresIn: '1d',
                }
              })
            }
        },
    ]
})
export class AuthModule { }
