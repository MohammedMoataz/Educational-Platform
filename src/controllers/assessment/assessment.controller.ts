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
import { AssessmentDto, CreateAssessmentDto, UpdateAssessmentDto } from 'src/DTO/assessment.dto'
import { AssessmentService } from 'src/services/assessment/assessment.service'

@Controller('assessment')
export class AssessmentController {
    constructor(private AssessmentService: AssessmentService) { }

    @ApiTags("Assessment APIs")
    @Get('/all')
    getAssessments() {
        return this.AssessmentService.findAll()
    }

    @ApiTags("Assessment APIs")
    @Get('/:id')
    getAssessment(id: number) {
        return this.AssessmentService.findOneById(id)
    }

    @ApiTags("Assessment APIs")
    @Post()
    createAssessment(@Body() newAssessment: CreateAssessmentDto) {
        return this.AssessmentService.create(newAssessment)
    }

    @ApiTags("Assessment APIs")
    @Put('/:id')
    updateAssessment(@Query('id', ParseIntPipe) id: number, @Body() updatedAssessment: UpdateAssessmentDto) {
        return this.AssessmentService.update(id, updatedAssessment)
    }

    @ApiTags("Assessment APIs")
    @Delete('/:id')
    removeAssessment(@Query('id', ParseIntPipe) id: number) {
        return this.AssessmentService.remove(id)
    }
}
