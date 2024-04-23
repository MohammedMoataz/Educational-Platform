import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UseInterceptors
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateCourseDto, UpdateCourseDto } from 'src/DTO/course.dto'
import { CourseService } from 'src/services/course/course.service'

@Controller('course')
export class CourseController {
    constructor(private CourseService: CourseService) { }

    @ApiTags("Course APIs")
    // @UseInterceptors(ClassSerializerInterceptor)
    @Get('all')
    getCoursess() {
        return this.CourseService.findAll()
    }

    @ApiTags("Course APIs")
    // @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    getCourse(id: number) {
        return this.CourseService.findOneById(id)
    }

    @ApiTags("Course APIs")
    @Post()
    createCourse(@Body() newCourses: CreateCourseDto) {
        return this.CourseService.create(newCourses)
    }

    @ApiTags("Course APIs")
    @Put(':id')
    updatecourse(@Query('id', ParseIntPipe) id: number, @Body() updatedCourses: UpdateCourseDto) {
        return this.CourseService.update(id, updatedCourses)
    }

    @ApiTags("Course APIs")
    @Delete(':id')
    removeCourse(@Query('id', ParseIntPipe) id: number) {
        return this.CourseService.remove(id)
    }
}
