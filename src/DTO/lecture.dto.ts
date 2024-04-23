import { ApiProperty } from "@nestjs/swagger"
import { CourseDto } from "./course.dto"
import { AssessmentDto } from "./assessment.dto"
import { AttendanceDto } from "./attendance.dto"
import { IsNotEmpty } from "class-validator"

export class LectureDto {
    @ApiProperty()
    title: string
    @ApiProperty()
    content: string
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
}

export class CreateLectureDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string
    @ApiProperty()
    @IsNotEmpty()
    content: string
    @ApiProperty()
    course: CourseDto
    @ApiProperty()
    @IsNotEmpty()
    _created_at: Date
}

export class UpdateLectureDto {
    @ApiProperty()
    title: string
    @ApiProperty()
    content: string
    @ApiProperty()
    course: CourseDto
    @ApiProperty()
    assessments: AssessmentDto[]
    @ApiProperty()
    attendances: AttendanceDto[]
    @ApiProperty()
    _updated_at: Date
}