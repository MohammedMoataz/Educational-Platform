import { ApiProperty } from "@nestjs/swagger"
import { UserDto } from "./user.dto"
import { AssessmentDto } from "./assessment.dto"
import { IsNotEmpty } from "class-validator"

export class AssessmentSubmissionDto {
    @ApiProperty()
    user: UserDto
    @ApiProperty()
    assessment: AssessmentDto
    @ApiProperty()
    submission_date: Date
    @ApiProperty()
    score: number
    @ApiProperty()
    grade: string
    @ApiProperty()
    feedback: string
    @ApiProperty()
    _created_at: Date
}

export class CreateAssessmentSubmissionDto {
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
