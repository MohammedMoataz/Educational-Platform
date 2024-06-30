import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from "@nestjs/common"
import { Observable } from "rxjs"

@Injectable()
export class UserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
        console.log("intercept", context.getClass().name)
        return next.handle()
    }
}