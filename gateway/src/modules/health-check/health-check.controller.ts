import { Controller, Get } from '@nestjs/common';
import { HealthCheckResultDto, ServiceStatus } from './dto/health-result.dto';
import { HealthCheckService } from './health-check.service';

@Controller('health')
export class HealthController {
    constructor(
        private readonly healthCheckService: HealthCheckService,
    ) {}
    
    @Get()
    async check() {
        const result = new HealthCheckResultDto('api', ServiceStatus.UP);
        try {
            result.services = await Promise.all([
                this.healthCheckService.pingService('product'),
                this.healthCheckService.pingService('tracking'),
                this.healthCheckService.pingService('user'),
            ])
        } catch (error) {
            result.error = new Error(error).message;
        }

        const { heapUsed } = process.memoryUsage();
        result.memoryUsage = heapUsed;
                  
        return result;
    }
}