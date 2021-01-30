import { BadGatewayException, CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor, Request } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Observable, throwError } from "rxjs";
import { catchError, timeout } from "rxjs/operators";
import { ActityType } from "src/enums/activity-product.enum";

@Injectable()
export class TrackingInterceptor implements NestInterceptor {
    constructor(
        @Inject('TRACKING_SERVICE') private readonly trackingServiceClient: ClientProxy,
    ) {}
    
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const startTime = Date.now();
        const [,args,_,info] = context.getArgs();

        return next
            .handle()
            .pipe(
                timeout(10000),
                catchError(err => throwError(new BadGatewayException())),
                this.sendTracking(startTime, args, info.path),
            )
    }

    sendTracking(startTime: number, args: any, path: any) {
        const duration = Date.now() - startTime;
        let activityType = ActityType.SEARCH_PRODUCTS;

        if (path.typename === 'Query') {
            if (path.key === 'productDetail') {
                activityType = ActityType.GET_PROUCT_DETAIL;
            }
        }

        return () => this.trackingServiceClient.send('tracking_activity', {
            duration,
            type: activityType
        })
    }
}