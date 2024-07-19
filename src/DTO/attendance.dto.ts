import { ApiProperty } from "@nestjs/swagger"
import { Exclude } from "class-transformer"
import { IsNotEmpty } from "class-validator"

import { UserDto } from "./user.dto"
import { LectureDto } from "./lecture.dto"

export class AttendanceDto {
    constructor(partial: AttendanceDto) { Object.assign(this, partial) }

    @Exclude()
    id: number
    @Exclude()
    student_id: number
    @Exclude()
    lecture_id: number
    @ApiProperty()
    student: UserDto
    @ApiProperty()
    lecture: LectureDto
    @ApiProperty()
    _created_at: Date
    @Exclude()
    _deleted_at: Date
}

export class CreateAttendanceDto {
    @ApiProperty()
    @IsNotEmpty()
    student_uuid: string
    @Exclude()
    student_id: number
    @ApiProperty()
    @IsNotEmpty()
    lecture_uuid: string
    @Exclude()
    lecture_id: number
}

// export class DeleteAttendanceDto {
//     @ApiProperty()
//     @IsNotEmpty()
//     student_uuid: string
//     @Exclude()
//     student_id: number
//     @ApiProperty()
//     @IsNotEmpty()
//     lecture_uuid: string
//     @Exclude()
//     lecture_id: number
// }
