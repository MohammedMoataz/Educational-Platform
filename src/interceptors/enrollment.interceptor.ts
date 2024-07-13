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
import { UserDto } from "src/DTO/user.dto"
import { CourseDto } from "src/DTO/course.dto"

@Injectable()
export class GetEnrollmentInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map(enrollment => plainToClass(EnrollmentDto, enrollment)))
    }
}