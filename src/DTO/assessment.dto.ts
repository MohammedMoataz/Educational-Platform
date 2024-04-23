import { ApiProperty } from "@nestjs/swagger"
import { LectureDto } from "./lecture.dto"
import { AssessmentSubmissionDto } from "./assessment_submission.dto"
import { IsNotEmpty } from "class-validator"

export class AssessmentDto {
    @ApiProperty()
    title: string
    @ApiProperty()
    description: string
    @ApiProperty()
    type: string
    @ApiProperty()
    solution: string
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
    lecture: LectureDto
    @ApiProperty()
    @IsNotEmpty()
    _created_at: Date
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
    lecture: LectureDto
    @ApiProperty()
    _updated_at: Date
}