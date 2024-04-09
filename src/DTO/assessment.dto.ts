import { ApiProperty } from "@nestjs/swagger"
import { LectureDto } from "./lecture.dto"
import { AssessmentSubmissionDto } from "./assessment_submission.dto"

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