import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    ParseIntPipe,
    Post,
    Query,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { CreateAssessmentSubmissionDto } from 'src/DTO/assessment_submission.dto'
import { AssessmentSubmissionService } from 'src/services/assessment_submission/assessment_submission.service'

@Controller()
@ApiBearerAuth('JWT')
export class AssessmentSubmissionController {
    constructor(private AssessmentSubmissionService: AssessmentSubmissionService) { }

    @ApiTags("User APIs")
    @Get('student/submissions')
    @UseInterceptors(ClassSerializerInterceptor)
    getStudentSubmissionss(@Query('student_id', ParseIntPipe) student_id: number) {
        return this.AssessmentSubmissionService.findAllByStudent(student_id)
    }

    @ApiTags("Assessment APIs")
    @Get('assessment/submissions')
    @UseInterceptors(ClassSerializerInterceptor)
    getAssessmentSubmissionss(@Query('assessment_id', ParseIntPipe) assessment_id: number) {
        return this.AssessmentSubmissionService.findAllByAssessment(assessment_id)
    }

    @ApiTags("User APIs", "Assessment APIs")
    @Get('assessment/submission')
    @UseInterceptors(ClassSerializerInterceptor)
    getAssessmentSubmission(@Query('student_id', ParseIntPipe) student_id: number, @Query('assessment_id', ParseIntPipe) assessment_id: number) {
        return this.AssessmentSubmissionService.findOne(student_id, assessment_id)
    }

    @ApiTags("User APIs", "Assessment APIs")
    @Post('assessment/submission')
    @UsePipes(ValidationPipe)
    createAssessmentSubmission(@Body() newAssessmentSubmission: CreateAssessmentSubmissionDto) {
        return this.AssessmentSubmissionService.create(newAssessmentSubmission)
    }
}
