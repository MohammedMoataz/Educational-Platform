import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { Exclude } from "class-transformer"

import { CourseDto } from "./course.dto"
import { AssessmentDto } from "./assessment.dto"
import { AttendanceDto } from "./attendance.dto"

export class LectureDto {
    constructor(partial: LectureDto) { Object.assign(this, partial) }

    @Exclude()
    id: number
    @ApiProperty()
    title: string
    @ApiProperty()
    content: string
    @Exclude()
    course_id: number
    @ApiProperty()
    course: CourseDto
    @ApiProperty()
    assessments: AssessmentDto[]
    @ApiProperty()
    attendances: AttendanceDto[]
    @ApiProperty()
    _created_at: Date
    @ApiProperty()
    _updated_at: Date
    @Exclude()
    _deleted_at: Date
}

export class CreateLectureDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string
    @ApiProperty()
    @IsNotEmpty()
    content: string
    @ApiProperty()
    @IsNotEmpty()
    course_id: number
}

export class UpdateLectureDto {
    @ApiProperty()
    title: string
    @ApiProperty()
    content: string
    @ApiProperty()
    course_id: number
}