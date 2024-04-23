import {
    Body,
    Controller,
    Get,
    Post,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AssessmentSubmissionDto, CreateAssessmentSubmissionDto } from 'src/DTO/assessment_submission.dto'
import { AssessmentSubmissionService } from 'src/services/assessment_submission/assessment_submission.service'

@Controller('assessment-submission')
export class AssessmentSubmissionController {
    constructor(private AssessmentSubmissionService: AssessmentSubmissionService) { }

    @ApiTags("Assessment APIs")
    @Get('/all')
    getAssessmentSubmissionss() {
        return this.AssessmentSubmissionService.findAll()
    }

    @ApiTags("Assessment APIs")
    @Get('/:id')
    getAssessmentSubmission(id: number) {
        return this.AssessmentSubmissionService.findOneById(id)
    }

    @ApiTags("Assessment APIs")
    @Post()
    createAssessmentSubmission(@Body() newAssessmentSubmission: CreateAssessmentSubmissionDto) {
        return this.AssessmentSubmissionService.create(newAssessmentSubmission)
    }
}
