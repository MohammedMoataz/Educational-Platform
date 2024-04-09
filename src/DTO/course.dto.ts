import { ApiProperty } from "@nestjs/swagger"
import { UserDto } from "./user.dto"
import { CourseMaterialDto } from "./course_material.dto"
import { LectureDto } from "./lecture.dto"
import { EnrollmentDto } from "./enrollment.dto"

export class CourseDto {
    @ApiProperty()
    name: string
    @ApiProperty()
    description: string
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