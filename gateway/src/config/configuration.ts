import { Transport } from "@nestjs/microservices";

export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    redis_host: process.env.REDIS_HOST,
    productsService: {
        transport: Transport.REDIS,
        options: {
            url: process.env.REDIS_HOST,
        }
    }
});