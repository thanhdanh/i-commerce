import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auh.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [
        JwtStrategy,
        AuthResolver,
        {
            provide: 'USER_SERVICE',
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
    ]
})
export class AuthModule { }
