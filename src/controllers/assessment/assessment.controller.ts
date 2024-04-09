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
import { AssessmentDto } from 'src/DTO/assessment.dto'
import { AssessmentService } from 'src/services/assessment/assessment.service'
import { AssessmentParams } from 'src/utils/type'

@Controller('assessment')
export class AssessmentController {
    constructor(private AssessmentService: AssessmentService) { }

    @ApiTags("Assessment APIs")
    @Get('/all')
    getAssessmentss() {
        return this.AssessmentService.findAll()
    }

    @ApiTags("Assessment APIs")
    @Get('/:id')
    getAssessments(id: number) {
        return this.AssessmentService.findOneById(id)
    }

    @ApiTags("Assessment APIs")
    @Post()
    createAssessments(@Body() createAssessmentsParams: AssessmentParams) {
        return this.AssessmentService.create(createAssessmentsParams)
    }

    @ApiTags("Assessment APIs")
    @Put('/:id')
    updateAssessments(@Query('id', ParseIntPipe) id: number, @Body() updatedAssessmentsParams: AssessmentParams) {
        return this.AssessmentService.update(id, updatedAssessmentsParams)
    }

    @ApiTags("Assessment APIs")
    @Delete('/:id')
    removeAssessments(@Query('id', ParseIntPipe) id: number) {
        return this.AssessmentService.remove(id)
    }
}
