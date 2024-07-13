import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from "@nestjs/common"
import { v4 as uuidv4 } from 'uuid'
import { plainToClass } from "class-transformer"
import {
    map,
    Observable
} from "rxjs"

import { CourseDto } from "src/DTO/course.dto"

@Injectable()
export class CreateCourseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest()
        req.body["uuid"] = uuidv4()

        return next.handle().pipe(map(course => plainToClass(CourseDto, course)))
    }
}