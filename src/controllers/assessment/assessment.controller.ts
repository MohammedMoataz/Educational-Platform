import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CreateAssessmentDto, UpdateAssessmentDto } from 'src/DTO/assessment.dto'
import { AssessmentService } from 'src/services/assessment/assessment.service'

@Controller()
export class AssessmentController {
    constructor(private AssessmentService: AssessmentService) { }

    @ApiTags("Assessment APIs", "Lecture APIs")
    @Get('lecture/assessments')
    @UseInterceptors(ClassSerializerInterceptor)
    getAssessments(@Query('lecture_id', ParseIntPipe) lecture_id: number) {
        return this.AssessmentService.findAllByLecture(lecture_id)
    }

    @ApiTags("Assessment APIs")
    @Get('assessment')
    @UseInterceptors(ClassSerializerInterceptor)
    getAssessment(id: number) {
        return this.AssessmentService.findOneById(id)
    }

    @ApiTags("Assessment APIs")
    @Post('assessment')
    @UsePipes(ValidationPipe)
    createAssessment(@Body() newAssessment: CreateAssessmentDto) {
        return this.AssessmentService.create(newAssessment)
    }

    @ApiTags("Assessment APIs")
    @Put('assessment')
    @UsePipes(ValidationPipe)
    updateAssessment(@Query('id', ParseIntPipe) id: number, @Body() updatedAssessment: UpdateAssessmentDto) {
        return this.AssessmentService.update(id, updatedAssessment)
    }

    @ApiTags("Assessment APIs")
    @Delete('assessment')
    @UsePipes(ValidationPipe)
    removeAssessment(@Query('id', ParseIntPipe) id: number) {
        return this.AssessmentService.remove(id)
    }
}
