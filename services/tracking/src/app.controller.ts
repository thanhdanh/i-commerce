import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { HealthCheckResultDto, ServiceStatus } from './dto/health-result.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('tracking_healthz')
  async checkHealth(timeout: number) {
    const result = new HealthCheckResultDto('tracking_service', ServiceStatus.UP);
    const db = new HealthCheckResultDto('tracking_db', ServiceStatus.DOWN);
    // try {
    //   if (await this.productService.checkDB(timeout)) {
    //     db.status = ServiceStatus.UP;
    //   }
    // } catch (error) {
    //   db.status = ServiceStatus.DOWN;
    //   db.error = new Error(error).message;
    // }
    result.services.push(db);
    return result;

    // try {
    //   if (await this.productService.checkDB(timeout)) {
    //     result.db_status = 'up';
    //   }
    // } catch (error) {
    //   result.db_status = 'down';
    // }
    
    return result;
  }
}
