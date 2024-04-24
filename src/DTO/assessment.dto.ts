import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { Exclude } from "class-transformer"

import { LectureDto } from "./lecture.dto"
import { AssessmentSubmissionDto } from "./assessment_submission.dto"

export class AssessmentDto {
    constructor(partial: AssessmentDto) { Object.assign(this, partial) }

    @Exclude()
    id: number
    @ApiProperty()
    title: string
    @ApiProperty()
    description: string
    @ApiProperty()
    type: string
    @ApiProperty()
    solution: string
    @Exclude()
    lecture_id: number
    @ApiProperty()
    lecture: LectureDto
    @ApiProperty()
    assessmentSubmissions: AssessmentSubmissionDto[]
    @ApiProperty()
    _created_at: Date
    @ApiProperty()
    _updated_at: Date
}

export class CreateAssessmentDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string
    @ApiProperty()
    @IsNotEmpty()
    description: string
    @ApiProperty()
    @IsNotEmpty()
    type: string
    @ApiProperty()
    @IsNotEmpty()
    solution: string
    @ApiProperty()
    @IsNotEmpty()
    lecture_id: number
}

export class UpdateAssessmentDto {
    @ApiProperty()
    title: string
    @ApiProperty()
    description: string
    @ApiProperty()
    type: string
    @ApiProperty()
    solution: string
    @ApiProperty()
    lecture_id: number
}