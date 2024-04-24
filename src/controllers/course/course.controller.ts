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

@Controller()
export class CourseController {
    constructor(private CourseService: CourseService) { }

    @ApiTags("Course APIs")
    // @UseInterceptors(ClassSerializerInterceptor)
    @Get('course/all')
    getCoursess() {
        return this.CourseService.findAll()
    }

    @ApiTags("User APIs", "Course APIs")
    // @UseInterceptors(ClassSerializerInterceptor)
    @Get('user/courses')
    getTeacherCoursess(@Query('teacher_id', ParseIntPipe) teacher_id: number) {
        return this.CourseService.findAllByTeacher(teacher_id)
    }

    @ApiTags("Course APIs")
    // @UseInterceptors(ClassSerializerInterceptor)
    @Get('course')
    getCourse(id: number) {
        return this.CourseService.findOneById(id)
    }

    @ApiTags("Course APIs")
    @Post('course')
    createCourse(@Body() newCourses: CreateCourseDto) {
        return this.CourseService.create(newCourses)
    }

    @ApiTags("Course APIs")
    @Put('course')
    updatecourse(@Query('id', ParseIntPipe) id: number, @Body() updatedCourses: UpdateCourseDto) {
        return this.CourseService.update(id, updatedCourses)
    }

    @ApiTags("Course APIs")
    @Delete('course')
    removeCourse(@Query('id', ParseIntPipe) id: number) {
        return this.CourseService.remove(id)
    }
}
