import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthCheckResultDto, ServiceStatus } from './dto/health-result.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { LoginInput } from './dto/login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('user_healthz')
  async checkHealth(timeout: number) {
    const result = new HealthCheckResultDto('user_service', ServiceStatus.UP);
    const db = new HealthCheckResultDto('user_db', ServiceStatus.DOWN);
    
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

  @MessagePattern('get_user_by_username')
  async getUser(username: string) {
    const user = await this.appService.getUserByUsername(username);
    return user;
  }

  @MessagePattern('login_by_credential')
  async getTokenByCredential(@Payload() data: LoginInput) {
    console.log('login_by_credential');
    const result = await this.appService.login(data);
    return result;
  }
}
