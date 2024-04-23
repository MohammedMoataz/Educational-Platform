import { ApiProperty } from "@nestjs/swagger"
import { CourseDto } from "./course.dto"
import { IsNotEmpty } from "class-validator"

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
}

export class UpdateCourseMaterialDto {
    @ApiProperty()
    title: string
    @ApiProperty()
    description: string
    @ApiProperty()
    file_url: string
}