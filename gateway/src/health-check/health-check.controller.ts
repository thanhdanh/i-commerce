import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { forkJoin } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Controller('health')
export class HealthController {
    constructor(
        @Inject('PRODUCT_SERVICE') private readonly productServiceClient: ClientProxy,
        @Inject('TRACKING_SERVICE') private readonly trackingServiceClient: ClientProxy,
    ) {}
    
    @Get()
    check() {
        forkJoin([
            this.productServiceClient.send('health', {}).pipe(timeout(5000)),
            this.trackingServiceClient.send('health', {}).pipe(timeout(5000)),
        ]).subscribe((data: any) => {
            console.log('data', data);
        })
    }
}