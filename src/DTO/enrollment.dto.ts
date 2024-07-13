import { ApiProperty } from "@nestjs/swagger"
import { UserDto } from "./user.dto"
import { CourseDto } from "./course.dto"
import { IsNotEmpty } from "class-validator"
import { Exclude } from "class-transformer"

export class EnrollmentDto {
    constructor(partial: EnrollmentDto) { Object.assign(this, partial) }

    @Exclude()
    id: number
    @Exclude()
    student_id: number
    @Exclude()
    course_id: number
    @ApiProperty()
    student: UserDto
    @ApiProperty()
    course: CourseDto
    @ApiProperty()
    _created_at: Date
    @Exclude()
    _deleted_at: Date
}

export class CreateEnrollmentDto {
    @ApiProperty()
    @IsNotEmpty()
    student_uuid: string
    @ApiProperty()
    @IsNotEmpty()
    course_uuid: string
    @Exclude()
    student_id: number
    @Exclude()
    course_id: number
}
