import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { forkJoin, Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { HealthCheckResultDto, ServiceStatus } from './dto/health-result.dto';

@Controller('health')
export class HealthController {
    constructor(
        @Inject('PRODUCT_SERVICE') private readonly productServiceClient: ClientProxy,
        @Inject('TRACKING_SERVICE') private readonly trackingServiceClient: ClientProxy,
    ) {}
    
    @Get()
    async check() {
        const result = new HealthCheckResultDto('api', ServiceStatus.UP);
        try {
            result.services = await forkJoin([
                <Observable<HealthCheckResultDto>> this.productServiceClient.send('product_healthz', 5000).pipe(timeout(5000)),
                <Observable<HealthCheckResultDto>> this.trackingServiceClient.send('tracking_healthz', 5000).pipe(timeout(5000)),
            ]).toPromise();
        } catch (error) {
            result.error = new Error(error).message;
        }

        return result;
    }
}