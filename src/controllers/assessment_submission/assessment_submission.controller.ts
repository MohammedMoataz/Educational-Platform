import {
    Body,
    Controller,
    Delete,
    Get,
    ParseIntPipe,
    Post,
    Put,
    Query
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AssessmentSubmissionDto } from 'src/DTO/assessment_submission.dto'
import { AssessmentSubmissionService } from 'src/services/assessment_submission/assessment_submission.service'
import { AssessmentSubmissionParams } from 'src/utils/type'

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
    getAssessmentSubmissions(id: number) {
        return this.AssessmentSubmissionService.findOneById(id)
    }

    @ApiTags("Assessment APIs")
    @Post()
    createAssessmentSubmissions(@Body() createAssessmentSubmissionsParams: AssessmentSubmissionParams) {
        return this.AssessmentSubmissionService.create(createAssessmentSubmissionsParams)
    }

    @ApiTags("Assessment APIs")
    @Put('/:id')
    updateAssessmentSubmissions(@Query('id', ParseIntPipe) id: number, @Body() updatedAssessmentSubmissionsParams: AssessmentSubmissionParams) {
        return this.AssessmentSubmissionService.update(id, updatedAssessmentSubmissionsParams)
    }

    @ApiTags("Assessment APIs")
    @Delete('/:id')
    removeAssessmentSubmissions(@Query('id', ParseIntPipe) id: number) {
        return this.AssessmentSubmissionService.remove(id)
    }
}
