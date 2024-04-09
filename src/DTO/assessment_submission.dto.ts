import { ApiProperty } from "@nestjs/swagger"
import { UserDto } from "./user.dto"
import { AssessmentDto } from "./assessment.dto"

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