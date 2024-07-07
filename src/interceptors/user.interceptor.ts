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

import { AssessmentSubmissionDto } from "src/DTO/assessment_submission.dto"
import { AttendanceDto } from "src/DTO/attendance.dto"
import { CourseDto } from "src/DTO/course.dto"
import { EnrollmentDto } from "src/DTO/enrollment.dto"

@Injectable()
export class UserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
        return next.handle()
            .pipe(map(user => {
                user.enrollments = user.enrollments.filter((enrollment: { _deleted_at: null }) => enrollment._deleted_at === null)
                user.enrollments = user.enrollments.map((enrollment: any) => plainToClass(EnrollmentDto, enrollment))

                user.attendances = user.attendances.filter((attendance: { _deleted_at: null }) => attendance._deleted_at === null)
                user.attendances = user.attendances.map((attendance: any) => plainToClass(AttendanceDto, attendance))

                user.courses = user.courses.filter((course: { _deleted_at: null }) => course._deleted_at === null)
                user.courses = user.courses.map((course: any) => plainToClass(CourseDto, course))

                user.assessmentSubmissions = user.assessmentSubmissions.map((assessmentSubmission: any) => plainToClass(AssessmentSubmissionDto, assessmentSubmission))

                return user
            }))
    }
}