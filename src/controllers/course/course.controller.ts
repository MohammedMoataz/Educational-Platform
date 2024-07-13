import {
    Body,
    Controller,
    Delete,
    Get,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UseInterceptors,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { CreateCourseDto, UpdateCourseDto } from 'src/DTO/course.dto'
import { CreateCourseInterceptor } from 'src/interceptors/course.interceptor'
import { CourseService } from 'src/services/course/course.service'

@ApiTags("Course APIs")
// @ApiBearerAuth('JWT')
@Controller()
export class CourseController {
    constructor(private CourseService: CourseService) { }

    // @UseInterceptors(ClassSerializerInterceptor)
    @Get('course/all')
    getCoursess() {
        return this.CourseService.findAll()
    }

    @ApiTags("User APIs")
    // @UseInterceptors(ClassSerializerInterceptor)
    @Get('user/courses')
    getTeacherCoursess(@Query('teacher_id') teacher_id: string) {
        return this.CourseService.findAllByTeacher(teacher_id)
    }

    // @UseInterceptors(ClassSerializerInterceptor)
    @Get('course')
    getCourse(@Query('id') id: string) {
        return this.CourseService.findOneById(id)
    }

    @Post('course')
    @UseInterceptors(CreateCourseInterceptor)
    createCourse(@Body() newCourses: CreateCourseDto) {
        return this.CourseService.create(newCourses)
    }

    @Put('course')
    updatecourse(@Query('id') id: string, @Body() updatedCourses: UpdateCourseDto) {
        return this.CourseService.update(id, updatedCourses)
    }

    @Delete('course')
    removeCourse(@Query('id') id: string) {
        return this.CourseService.remove(id)
    }
}
