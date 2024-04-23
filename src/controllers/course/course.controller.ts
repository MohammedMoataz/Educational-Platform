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
import { CourseDto, CreateCourseDto, UpdateCourseDto } from 'src/DTO/course.dto'
import { CourseService } from 'src/services/course/course.service'

@Controller('course')
export class CourseController {
    constructor(private CourseService: CourseService) { }

    @ApiTags("Course APIs")
    @Get('/all')
    getcoursess() {
        return this.CourseService.findAll()
    }

    @ApiTags("Course APIs")
    @Get('/:id')
    getcourses(id: number) {
        return this.CourseService.findOneById(id)
    }

    @ApiTags("Course APIs")
    @Post()
    createcourses(@Body() newCourses: CreateCourseDto) {
        return this.CourseService.create(newCourses)
    }

    @ApiTags("Course APIs")
    @Put('/:id')
    updatecourses(@Query('id', ParseIntPipe) id: number, @Body() updatedCourses: UpdateCourseDto) {
        return this.CourseService.update(id, updatedCourses)
    }

    @ApiTags("Course APIs")
    @Delete('/:id')
    removecourses(@Query('id', ParseIntPipe) id: number) {
        return this.CourseService.remove(id)
    }
}
