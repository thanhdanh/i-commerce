export enum ServiceStatus {
    UP = 'up',
    DOWN = 'down'
}

export class HealthCheckResultDto {
    name: string;
    status: ServiceStatus;
    error?: string;
    services: HealthCheckResultDto[];
    memoryUsage: number;

    constructor(name: string, status:ServiceStatus) {
        this.name = name;
        this.status = status;
        this.services = [];
    }
}