import { ApiProperty } from "@nestjs/swagger"
import { UserDto } from "./user.dto"
import { LectureDto } from "./lecture.dto"

export class AttendanceDto {
    @ApiProperty()
    student: UserDto
    @ApiProperty()
    lecture: LectureDto
    @ApiProperty()
    _created_at: Date
}