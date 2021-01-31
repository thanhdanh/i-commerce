import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { timeout } from "rxjs/operators";
import { HealthCheckResultDto, ServiceStatus } from "./dto/health-result.dto";

@Injectable()
export class HealthCheckService {
    constructor(
        @Inject('TRANSPORT_SERVICE') private readonly transportServiceClient: ClientProxy,
    ) { }

    async pingService(serviceName: string): Promise<HealthCheckResultDto> {
        const event = serviceName + '_healthz';
        const TIMEOUT_IN_MS = 5000;
        try {
            const result = await this.transportServiceClient.send(event, TIMEOUT_IN_MS)
                .pipe(timeout(TIMEOUT_IN_MS))
                .toPromise();
            return result;
        } catch (error) {
            const result = new HealthCheckResultDto(serviceName + '_service', ServiceStatus.DOWN);
            result.error = new Error(error).message;
            return result;
        }
    }
}