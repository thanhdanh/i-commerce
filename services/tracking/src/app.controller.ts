import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateProductActivityDTO } from './dto/create-activity.dto';
import { HealthCheckResultDto, ServiceStatus } from './dto/health-result.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('tracking_healthz')
  async checkHealth(timeout: number) {
    const result = new HealthCheckResultDto('tracking_service', ServiceStatus.UP);
    const db = new HealthCheckResultDto('tracking_db', ServiceStatus.DOWN);
    
    try {
      await this.appService.checkDB(timeout)
      db.status = ServiceStatus.UP;
    } catch (error) {
      db.status = ServiceStatus.DOWN;
      db.error = new Error(error).message;
    }

    result.services.push(db);
    
    const { heapUsed } = process.memoryUsage();
    result.memoryUsage = heapUsed;
    
    return result;
  }

  @MessagePattern('tracking_activity')
  async addNewActivity(data: CreateProductActivityDTO) {
    console.log(data)
    return this.appService.addActivity(data);
  }
}
