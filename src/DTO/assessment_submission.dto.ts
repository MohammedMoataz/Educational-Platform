import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, Max, Min } from "class-validator"
import { Exclude } from "class-transformer"

import { UserDto } from "./user.dto"
import { AssessmentDto } from "./assessment.dto"

export class AssessmentSubmissionDto {
    constructor(partial: AssessmentSubmissionDto) { Object.assign(this, partial) }

    @Exclude()
    id: number
    @Exclude()
    student_id: number
    @Exclude()
    assessment_id: number
    @ApiProperty()
    student: UserDto
    @ApiProperty()
    assessment: AssessmentDto
    @ApiProperty()
    submission_date: Date
    @ApiProperty()
    @IsInt()
    @Min(0)
    @Max(100)
    score: number
    @ApiProperty()
    grade: string
    @ApiProperty()
    feedback: string
    @ApiProperty()
    _created_at: Date
    @ApiProperty()
    _updated_at: Date
    @Exclude()
    _deleted_at: Date
}

export class CreateAssessmentSubmissionDto {
    @Exclude()
    student_id: number
    @Exclude()
    assessment_id: number
    @ApiProperty()
    student_uuid: string
    @ApiProperty()
    assessment_uuid: string
    @ApiProperty()
    @IsNotEmpty()
    submission_date: Date
    @ApiProperty()
    @IsNotEmpty()
    score: number
    @ApiProperty()
    @IsNotEmpty()
    grade: string
    @ApiProperty()
    feedback: string
}
