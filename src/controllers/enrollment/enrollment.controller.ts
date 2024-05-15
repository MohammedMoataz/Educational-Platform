import {
    Body,
    Controller,
    Delete,
    Get,
    ParseIntPipe,
    Post,
    Query,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { CreateEnrollmentDto } from 'src/DTO/enrollment.dto'
import { EnrollmentService } from 'src/services/enrollment/enrollment.service'

@ApiBearerAuth('JWT')
@Controller()
export class EnrollmentController {
    constructor(private EnrollmentService: EnrollmentService) { }

    @ApiTags("User APIs")
    @Get('user/enrollments')
    getUserEnrollments(@Query('id', ParseIntPipe) id: number) {
        return this.EnrollmentService.findAllbyUser(id)
    }

    @ApiTags("Course APIs")
    @Get('course/enrollments')
    getCourseEnrollments(@Query('id', ParseIntPipe) id: number) {
        return this.EnrollmentService.findAllbyCourse(id)
    }

    @ApiTags("Course APIs", "User APIs")
    @Get('enrollment')
    getEnrollment(
        @Query('user_id', ParseIntPipe) user_id: number,
        @Query('course_id', ParseIntPipe) course_id: number
    ) {
        return this.EnrollmentService.findOne(user_id, course_id)
    }

    @ApiTags("Course APIs", "User APIs")
    @Post('enrollment')
    @UsePipes(ValidationPipe)
    createEnrollment(@Body() newEnrollment: CreateEnrollmentDto) {
        return this.EnrollmentService.create(newEnrollment)
    }

    @ApiTags("Course APIs", "User APIs")
    @Delete('enrollment')
    removeEnrollment(
        @Query('user_id', ParseIntPipe) user_id: number,
        @Query('course_id', ParseIntPipe) course_id: number
    ) {
        return this.EnrollmentService.remove(user_id, course_id)
    }
}
