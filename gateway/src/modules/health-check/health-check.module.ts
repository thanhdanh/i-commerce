import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { HealthController } from './health-check.controller';
import { HealthCheckService } from './health-check.service';

@Module({
    controllers: [HealthController],
    providers: [
        HealthCheckService,
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
    ]
})
export class HealthCheckModule { }