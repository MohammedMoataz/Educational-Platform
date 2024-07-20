import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from "@nestjs/common"
import { plainToClass } from "class-transformer"
import {
    map,
    Observable
} from "rxjs"

import { EnrollmentDto } from "src/DTO/enrollment.dto"

@Injectable()
export class CreateEnrollmentInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map(enrollment => plainToClass(EnrollmentDto, enrollment)))
    }
}