import {
    Body,
    Controller,
    Delete,
    Get,
    ParseIntPipe,
    Post,
    Put,
    Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CreateCourseDto, UpdateCourseDto } from 'src/DTO/course.dto'
import { CourseService } from 'src/services/course/course.service'

@ApiTags("Course APIs")
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
    getTeacherCoursess(@Query('teacher_id', ParseIntPipe) teacher_id: number) {
        return this.CourseService.findAllByTeacher(teacher_id)
    }

    // @UseInterceptors(ClassSerializerInterceptor)
    @Get('course')
    getCourse(id: number) {
        return this.CourseService.findOneById(id)
    }

    @Post('course')
    createCourse(@Body() newCourses: CreateCourseDto) {
        return this.CourseService.create(newCourses)
    }

    @Put('course')
    updatecourse(@Query('id', ParseIntPipe) id: number, @Body() updatedCourses: UpdateCourseDto) {
        return this.CourseService.update(id, updatedCourses)
    }

    @Delete('course')
    removeCourse(@Query('id', ParseIntPipe) id: number) {
        return this.CourseService.remove(id)
    }
}
