import { ApiProperty } from "@nestjs/swagger"
import { EnrollmentDto } from "./enrollment.dto"
import { AssessmentSubmissionDto } from "./assessment_submission.dto"
import { AttendanceDto } from "./attendance.dto"
import { CourseDto } from "./course.dto"

export class UserDto {
    @ApiProperty()
    first_name: string
    @ApiProperty()
    last_name: string
    @ApiProperty()
    email: string
    @ApiProperty({ enum: ["student", "teacher", "administrator"] })
    role: "student" | "teacher" | "administrator"
    @ApiProperty()
    disabled: boolean
    @ApiProperty()
    courses: CourseDto[]
    @ApiProperty()
    assessmentSubmissions: AssessmentSubmissionDto[]
    @ApiProperty()
    enrollments: EnrollmentDto[]
    @ApiProperty()
    attendances: AttendanceDto[]
    @ApiProperty()
    created_at: Date
    @ApiProperty()
    updated_at: Date
}
