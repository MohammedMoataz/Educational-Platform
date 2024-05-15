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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { CreateLectureDto, UpdateLectureDto } from 'src/DTO/lecture.dto'
import { LectureService } from 'src/services/lecture/lecture.service'

@ApiTags('Lecture APIs')
@ApiBearerAuth('JWT')
@Controller()
export class LectureController {
    constructor(private lectureService: LectureService) { }

    @Get('lecture/all')
    getLectures() {
        return this.lectureService.findAll()
    }

    
    @Get('lecture')
    getLecture(@Query('id', ParseIntPipe) id: number) {
        return this.lectureService.findOneById(id)
    }

    
    @Post('lecture')
    @UsePipes(ValidationPipe)
    createLecture(@Body() newLecture: CreateLectureDto) {
        return this.lectureService.create(newLecture)
    }

    
    @Put('lecture')
    @UsePipes(ValidationPipe)
    updateLecture(@Query('id', ParseIntPipe) id: number, @Body() updatedLecture: UpdateLectureDto) {
        return this.lectureService.update(id, updatedLecture)
    }

    
    @Delete('lecture')
    @UsePipes(ValidationPipe)
    removeLecture(@Query('id', ParseIntPipe) id: number) {
        return this.lectureService.remove(id)
    }
    
    @Get('course/lectures')
    getCourseLectures(@Query('course_id', ParseIntPipe) course_id: number) {
        return this.lectureService.getCourseLectures(course_id)
    }
}
