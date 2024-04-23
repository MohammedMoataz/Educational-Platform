import { ApiProperty } from "@nestjs/swagger"
import { UserDto } from "./user.dto"
import { CourseDto } from "./course.dto"
import { IsNotEmpty } from "class-validator"

export class EnrollmentDto {
    @ApiProperty()
    _created_at: Date
    @ApiProperty()
    _deleted_at: Date
}

export class CreateEnrollmentDto {
}

export class UpdateEnrollmentDto {
}