import { ApiProperty } from "@nestjs/swagger"
import { UserDto } from "./user.dto"
import { CourseDto } from "./course.dto"

export class EnrollmentDto {
    @ApiProperty()
    user: UserDto
    @ApiProperty()
    course: CourseDto
    @ApiProperty()
    _created_at: Date
    @ApiProperty()
    _deleted_at: Date
}