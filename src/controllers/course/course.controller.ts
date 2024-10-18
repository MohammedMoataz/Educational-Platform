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
    ValidationPipe,
} from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiTags
} from '@nestjs/swagger'

import { CreateCourseDto, UpdateCourseDto } from 'src/DTO/course.dto'
import { CreateCourseInterceptor } from 'src/interceptors/course.interceptor'
import { CourseService } from 'src/services/course/course.service'
import JwtAuthGuard from 'src/auth/guards/jwt.guard'

@ApiTags("Course APIs")
@ApiBearerAuth('JWT')
@Controller()
export class CourseController {
    constructor(private CourseService: CourseService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('course/all')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    getCoursess() {
        return this.CourseService.findAll()
    }

    @ApiTags("User APIs")
    @Get('user/courses')
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    getTeacherCoursess(@Query('teacher_id') teacher_id: string) {
        return this.CourseService.findAllByTeacher(teacher_id)
    }

    @Get('course')
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    getCourse(@Query('id') id: string) {
        return this.CourseService.findOneById(id)
    }

    @Post('course')
    @UseInterceptors(CreateCourseInterceptor)
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    createCourse(@Body() newCourses: CreateCourseDto) {
        return this.CourseService.create(newCourses)
    }

    @Put('course')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    updatecourse(@Query('id') id: string, @Body() updatedCourses: UpdateCourseDto) {
        return this.CourseService.update(id, updatedCourses)
    }

    @Delete('course')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    removeCourse(@Query('id') id: string) {
        return this.CourseService.remove(id)
    }
}
