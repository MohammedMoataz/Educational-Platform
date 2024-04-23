import { ApiProperty } from "@nestjs/swagger"
import { EnrollmentDto } from "./enrollment.dto"
import { AssessmentSubmissionDto } from "./assessment_submission.dto"
import { AttendanceDto } from "./attendance.dto"
import { CourseDto } from "./course.dto"
import { IsDateString, IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"
import { Exclude, Transform } from "class-transformer"

export class UserDto {
    constructor(partial: UserDto) {
        Object.assign(this, partial)
    }

    @Exclude()
    id: number
    @ApiProperty()
    first_name: any
    @ApiProperty()
    last_name: any
    @ApiProperty()
    @IsEmail()
    email: string
    @Exclude()
    password_hash: string
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
    @Exclude()
    _deleted_at: Date
}

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    first_name: string
    @ApiProperty()
    @IsNotEmpty()
    last_name: string
    @ApiProperty()
    @IsNotEmpty()
    email: string
    @ApiProperty({ minLength: 8 })
    @IsNotEmpty()
    password: string
    @ApiProperty({ enum: ["student", "teacher", "administrator"] })
    @IsNotEmpty()
    role: "student" | "teacher" | "administrator"
    @ApiProperty()
    disabled: boolean
}

export class UpdateUserDto {
    @ApiProperty()
    first_name: string
    @ApiProperty()
    last_name: string
    @ApiProperty()
    email: string
    @ApiProperty({ minLength: 8 })
    password: string
    @ApiProperty()
    disabled: boolean
}