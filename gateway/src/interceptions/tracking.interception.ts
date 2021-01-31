import { BadGatewayException, CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor, Request } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Observable, throwError } from "rxjs";
import { catchError, tap, timeout } from "rxjs/operators";
import { ActityType } from "src/enums/activity-product.enum";

@Injectable()
export class TrackingInterceptor implements NestInterceptor {
    constructor(
        @Inject('TRANSPORT_SERVICE') private readonly transportServiceClient: ClientProxy,
    ) {}
    
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const startTime = Date.now();
        const [,args, ctx, info] = context.getArgs();
        const userAgent = ctx.req.headers['user-agent'];
        return next
            .handle()
            .pipe(
                timeout(10000),
                catchError(err => throwError(new BadGatewayException())),
                tap(() => this.sendTracking(startTime, args, userAgent, info.path)),
            )
    }

    sendTracking(startTime: number, args: any, userAgent: string, path: any) {
        const duration = Date.now() - startTime;
        const trackingInfo = <any> {
            duration,
            type:  ActityType.SEARCH_PRODUCTS,
            userAgent
        };
        if (path.typename === 'Query') {
            if (path.key === 'productDetail') {
                trackingInfo.type = ActityType.GET_PROUCT_DETAIL;
                trackingInfo.params = args;
            } else if (path.key === 'products') {
                trackingInfo.query = {
                    filterBy: args.filterBy,
                    keyWord: args.search,
                }
            }
        }
        
        this.transportServiceClient.emit('tracking_activity', trackingInfo).pipe(timeout(5000))
    }
}