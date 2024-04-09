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
import { EnrollmentDto } from 'src/DTO/enrollment.dto'
import { EnrollmentService } from 'src/services/enrollment/enrollment.service'
import { EnrollmentParams } from 'src/utils/type'

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
    createEnrollment(@Body() createEnrollmentParams: EnrollmentParams) {
        return this.EnrollmentService.create(createEnrollmentParams)
    }

    @ApiTags("Course APIs", "User APIs")
    @Put('/:id')
    updateEnrollment(@Query('id', ParseIntPipe) id: number, @Body() updatedEnrollmentParams: EnrollmentParams) {
        return this.EnrollmentService.update(id, updatedEnrollmentParams)
    }

    @ApiTags("Course APIs", "User APIs")
    @Delete('/:id')
    removeEnrollment(@Query('id', ParseIntPipe) id: number) {
        return this.EnrollmentService.remove(id)
    }
}
