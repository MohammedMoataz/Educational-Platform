import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Post,
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

import { CreateEnrollmentDto } from 'src/DTO/enrollment.dto'
import { CreateEnrollmentInterceptor } from 'src/interceptors/enrollment.interceptor'
import { EnrollmentService } from 'src/services/enrollment/enrollment.service'
import JwtAuthGuard from 'src/auth/guards/jwt.guard'

@ApiBearerAuth('JWT')
@Controller()
export class EnrollmentController {
    constructor(private EnrollmentService: EnrollmentService) { }

    @ApiTags("User APIs")
    @Get('user/enrollments')
    @UseInterceptors(CreateEnrollmentInterceptor)
    @UseGuards(JwtAuthGuard)
    getUserEnrollments(@Query('user_id') id: string) {
        return this.EnrollmentService.findAllbyUser(id)
    }

    @ApiTags("Course APIs")
    @Get('course/enrollments')
    @UseInterceptors(CreateEnrollmentInterceptor)
    @UseGuards(JwtAuthGuard)
    getCourseEnrollments(@Query('course_id') id: string) {
        return this.EnrollmentService.findAllbyCourse(id)
    }

    @ApiTags("Course APIs", "User APIs")
    @Get('enrollment')
    @UseInterceptors(CreateEnrollmentInterceptor)
    @UseGuards(JwtAuthGuard)
    getEnrollment(
        @Query('user_id') user_id: string,
        @Query('course_id') course_id: string
    ) {
        return this.EnrollmentService.findOne(user_id, course_id)
    }

    @ApiTags("Course APIs", "User APIs")
    @Post('enrollment')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    createEnrollment(@Body() newEnrollment: CreateEnrollmentDto) {
        return this.EnrollmentService.create(newEnrollment)
    }

    @ApiTags("Course APIs", "User APIs")
    @Delete('enrollment')
    @UseGuards(JwtAuthGuard)
    removeEnrollment(
        @Query('user_id') user_id: string,
        @Query('course_id') course_id: string
    ) {
        return this.EnrollmentService.remove(user_id, course_id)
    }
}
