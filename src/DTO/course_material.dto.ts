import { ApiProperty } from "@nestjs/swagger"
import { CourseDto } from "./course.dto"

export class CourseMaterialDto {
    @ApiProperty()
    title: string
    @ApiProperty()
    description: string
    @ApiProperty()
    file_url: string
    @ApiProperty()
    course: CourseDto
    @ApiProperty()
    _created_at: Date
    @ApiProperty()
    _updated_at: Date
}