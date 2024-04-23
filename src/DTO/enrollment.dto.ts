import { ApiProperty } from "@nestjs/swagger"
import { UserDto } from "./user.dto"
import { CourseDto } from "./course.dto"
import { IsNotEmpty } from "class-validator"

export class EnrollmentDto {
    @ApiProperty()
    student: UserDto
    @ApiProperty()
    course: CourseDto
    @ApiProperty()
    _created_at: Date
    @ApiProperty()
    _deleted_at: Date
}

export class CreateEnrollmentDto {
    @ApiProperty()
    student: UserDto
    @ApiProperty()
    course: CourseDto
    @ApiProperty()
    @IsNotEmpty()
    _created_at: Date
}

export class UpdateEnrollmentDto {
    @ApiProperty()
    student: UserDto
    @ApiProperty()
    course: CourseDto
    @ApiProperty()
    @IsNotEmpty()
    _deleted_at: Date
}