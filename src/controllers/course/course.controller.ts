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
import { CourseDto } from 'src/DTO/course.dto'
import { CourseService } from 'src/services/course/course.service'
import { CourseParams } from 'src/utils/type'

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
    createcourses(@Body() createCoursesParams: CourseParams) {
        return this.CourseService.create(createCoursesParams)
    }

    @ApiTags("Course APIs")
    @Put('/:id')
    updatecourses(@Query('id', ParseIntPipe) id: number, @Body() updatedCoursesParamso: CourseParams) {
        return this.CourseService.update(id, updatedCoursesParamso)
    }

    @ApiTags("Course APIs")
    @Delete('/:id')
    removecourses(@Query('id', ParseIntPipe) id: number) {
        return this.CourseService.remove(id)
    }
}
