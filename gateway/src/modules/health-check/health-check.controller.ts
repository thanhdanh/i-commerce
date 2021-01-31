import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { forkJoin, Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { HealthCheckResultDto, ServiceStatus } from './dto/health-result.dto';

@Controller('health')
export class HealthController {
    constructor(
        @Inject('TRANSPORT_SERVICE') private readonly transportServiceClient: ClientProxy,
    ) {}
    
    @Get()
    async check() {
        const result = new HealthCheckResultDto('api', ServiceStatus.UP);
        try {
            result.services = await forkJoin([
                <Observable<HealthCheckResultDto>> this.transportServiceClient.send('product_healthz', 5000).pipe(timeout(5000)),
                <Observable<HealthCheckResultDto>> this.transportServiceClient.send('tracking_healthz', 5000).pipe(timeout(5000)),
                <Observable<HealthCheckResultDto>> this.transportServiceClient.send('user_healthz', 5000).pipe(timeout(5000)),
            ]).toPromise();
        } catch (error) {
            result.error = new Error(error).message;
        }

        const { heapUsed } = process.memoryUsage();
        result.memoryUsage = heapUsed;
                  
        return result;
    }
}