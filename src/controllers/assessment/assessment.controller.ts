import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Query,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiTags
} from '@nestjs/swagger'

import {
    CreateAssessmentDto,
    UpdateAssessmentDto
} from 'src/DTO/assessment.dto'
import { CreateAssessmentInterceptor } from 'src/interceptors/assessment.interceptor'
import { AssessmentService } from 'src/services/assessment/assessment.service'
import JwtAuthGuard from 'src/auth/guards/jwt.guard'

@ApiTags("Assessment APIs")
@ApiBearerAuth('JWT')
@Controller()
export class AssessmentController {
    constructor(private AssessmentService: AssessmentService) { }

    @ApiTags("Lecture APIs")
    @Get('lecture/assessments')
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    getAssessments(@Query('lecture_id') lecture_id: string) {
        return this.AssessmentService.findAllByLecture(lecture_id)
    }

    @Get('assessment')
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    getAssessment(@Query('id') id: string) {
        return this.AssessmentService.findAssessmentById(id)
    }

    @Post('assessment')
    @UsePipes(ValidationPipe)
    @UseInterceptors(CreateAssessmentInterceptor)
    @UseGuards(JwtAuthGuard)
    createAssessment(@Body() newAssessment: CreateAssessmentDto) {
        return this.AssessmentService.create(newAssessment)
    }

    @Put('assessment')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    updateAssessment(@Query('id') id: string, @Body() updatedAssessment: UpdateAssessmentDto) {
        return this.AssessmentService.update(id, updatedAssessment)
    }

    @Delete('assessment')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    removeAssessment(@Query('id') id: string) {
        return this.AssessmentService.remove(id)
    }
}
