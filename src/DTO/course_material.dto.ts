import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { Exclude } from "class-transformer"

import { CourseDto } from "./course.dto"

export class CourseMaterialDto {
    constructor(partial: CourseMaterialDto) { Object.assign(this, partial) }

    @Exclude()
    id: number
    @ApiProperty()
    title: string
    @ApiProperty()
    description: string
    @ApiProperty()
    file_url: string
    @Exclude()
    course_id: number
    @ApiProperty()
    course: CourseDto
    @ApiProperty()
    _created_at: Date
    @ApiProperty()
    _updated_at: Date
    @Exclude()
    _deleted_at: Date
}

export class CreateCourseMaterialDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string
    @ApiProperty()
    @IsNotEmpty()
    description: string
    @ApiProperty()
    @IsNotEmpty()
    file_url: string
    @ApiProperty()
    @IsNotEmpty()
    course_id: number
}

export class UpdateCourseMaterialDto {
    @ApiProperty()
    title: string
    @ApiProperty()
    description: string
    @ApiProperty()
    file_url: string
    @ApiProperty()
    course_id: number
}