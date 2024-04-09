import { ApiProperty } from "@nestjs/swagger"
import { CourseDto } from "./course.dto"
import { AssessmentDto } from "./assessment.dto"
import { AttendanceDto } from "./attendance.dto"

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