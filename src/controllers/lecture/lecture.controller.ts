import {
    Body,
    Controller,
    Delete,
    Get,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CreateLectureDto, UpdateLectureDto } from 'src/DTO/lecture.dto'
import { LectureService } from 'src/services/lecture/lecture.service'

@Controller()
export class LectureController {
    constructor(private lectureService: LectureService) { }

    @ApiTags('Lecture APIs')
    @Get('lecture/all')
    getLectures() {
        return this.lectureService.findAll()
    }

    @ApiTags('Lecture APIs')
    @Get('lecture')
    getLecture(id: number) {
        return this.lectureService.findOneById(id)
    }

    @ApiTags('Lecture APIs')
    @Post('lecture')
    @UsePipes(ValidationPipe)
    createLecture(@Body() newLecture: CreateLectureDto) {
        return this.lectureService.create(newLecture)
    }

    @ApiTags('Lecture APIs')
    @Put('lecture')
    @UsePipes(ValidationPipe)
    updateLecture(@Query('id', ParseIntPipe) id: number, @Body() updatedLecture: UpdateLectureDto) {
        return this.lectureService.update(id, updatedLecture)
    }

    @ApiTags('Lecture APIs')
    @Delete('lecture')
    @UsePipes(ValidationPipe)
    removeLecture(@Query('id', ParseIntPipe) id: number) {
        return this.lectureService.remove(id)
    }

    @ApiTags('Lecture APIs')
    @Delete('course/lectures')
    getCourseLectures(@Query('course_id', ParseIntPipe) course_id: number) {
        return this.lectureService.getCourseLectures(course_id)
    }
}
