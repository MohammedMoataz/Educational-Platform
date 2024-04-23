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
import { CreateEnrollmentDto, EnrollmentDto, UpdateEnrollmentDto } from 'src/DTO/enrollment.dto'
import { EnrollmentService } from 'src/services/enrollment/enrollment.service'

@Controller('enrollment')
export class EnrollmentController {
    constructor(private EnrollmentService: EnrollmentService) { }

    @ApiTags("Course APIs", "User APIs")
    @Get('/all')
    getEnrollments() {
        return this.EnrollmentService.findAll()
    }

    @ApiTags("Course APIs", "User APIs")
    @Get('/:id')
    getEnrollment(id: number) {
        return this.EnrollmentService.findOneById(id)
    }

    @ApiTags("Course APIs", "User APIs")
    @Post()
    createEnrollment(@Body() newEnrollment: CreateEnrollmentDto) {
        return this.EnrollmentService.create(newEnrollment)
    }

    @ApiTags("Course APIs", "User APIs")
    @Put('/:id')
    updateEnrollment(@Query('id', ParseIntPipe) id: number, @Body() deletedEnrollment: UpdateEnrollmentDto) {
        return this.EnrollmentService.update(id, deletedEnrollment)
    }

    @ApiTags("Course APIs", "User APIs")
    @Delete('/:id')
    removeEnrollment(@Query('id', ParseIntPipe) id: number) {
        return this.EnrollmentService.remove(id)
    }
}
