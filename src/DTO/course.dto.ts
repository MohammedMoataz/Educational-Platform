import { ApiProperty } from "@nestjs/swagger"
import { Exclude } from "class-transformer"
import { IsNotEmpty } from "class-validator"

import { UserDto } from "./user.dto"
import { CourseMaterialDto } from "./course_material.dto"
import { LectureDto } from "./lecture.dto"
import { EnrollmentDto } from "./enrollment.dto"

export class CourseDto {
    constructor(partial: CourseDto) { Object.assign(this, partial) }

    @Exclude()
    id: string
    @ApiProperty()
    name: string
    @ApiProperty()
    description: string
    @Exclude()
    teacher_id: number
    @ApiProperty()
    teacher: UserDto
    @ApiProperty()
    courseMaterails: CourseMaterialDto[]
    @ApiProperty()
    lectures: LectureDto[]
    @ApiProperty()
    enrollments: EnrollmentDto[]
    @ApiProperty()
    _created_at: Date
    @ApiProperty()
    _updated_at: Date
}

export class CreateCourseDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string
    @ApiProperty()
    @IsNotEmpty()
    description: string
    @ApiProperty()
    @IsNotEmpty()
    teacher_id: number
}

export class UpdateCourseDto {
    @ApiProperty()
    name: string
    @ApiProperty()
    description: string
    @ApiProperty()
    teacher_id: number
}