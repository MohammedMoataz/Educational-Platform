import { ApiProperty } from "@nestjs/swagger"
import { EnrollmentDto } from "./enrollment.dto"
import { AssessmentSubmissionDto } from "./assessment_submission.dto"
import { AttendanceDto } from "./attendance.dto"
import { CourseDto } from "./course.dto"
import { IsEmail, IsNotEmpty } from "class-validator"
import { Transform } from "class-transformer"

export class UserDto {
    @ApiProperty()
    first_name: any
    @ApiProperty()
    last_name: any
    @ApiProperty()
    email: string
    @ApiProperty({ enum: ["student", "teacher", "administrator"] })
    role: "student" | "teacher" | "administrator" | string
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
    _created_at: Date
    @ApiProperty()
    _updated_at: Date
}

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    first_name: string
    @ApiProperty()
    @IsNotEmpty()
    last_name: string
    @ApiProperty()
    @Transform(value => value.toString().toLowerCase())
    email: string
    @ApiProperty()
    @IsNotEmpty()
    password: string
    @ApiProperty({ enum: ["student", "teacher", "administrator"] })
    @IsNotEmpty({})
    role: "student" | "teacher" | "administrator"
    @ApiProperty()
    disabled: boolean
    @ApiProperty()
    @IsNotEmpty()
    _created_at: Date
}

export class UpdateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    first_name: string
    @ApiProperty()
    @IsNotEmpty()
    last_name: string
    @ApiProperty()
    @IsNotEmpty()
    email: string
    @ApiProperty()
    @IsNotEmpty()
    password: string
    @ApiProperty()
    disabled: boolean
    @ApiProperty()
    @IsNotEmpty()
    _updated_at: Date
}