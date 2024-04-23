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
import { CreateLectureDto, LectureDto, UpdateLectureDto } from 'src/DTO/lecture.dto'
import { LectureService } from 'src/services/lecture/lecture.service'

@Controller('lecture')
export class LectureController {
    constructor(private lectureService: LectureService) { }

    @ApiTags('Lecture APIs')
    @Get('/all')
    getLectures() {
        return this.lectureService.findAll()
    }

    @ApiTags('Lecture APIs')
    @Get('/:id')
    getLecture(id: number) {
        return this.lectureService.findOneById(id)
    }

    @ApiTags('Lecture APIs')
    @Post()
    createLecture(@Body() newLecture: CreateLectureDto) {
        return this.lectureService.create(newLecture)
    }

    @ApiTags('Lecture APIs')
    @Put('/:id')
    updateLecture(@Query('id', ParseIntPipe) id: number, @Body() updatedLecture: UpdateLectureDto) {
        return this.lectureService.update(id, updatedLecture)
    }

    @ApiTags('Lecture APIs')
    @Delete('/:id')
    removeLecture(@Query('id', ParseIntPipe) id: number) {
        return this.lectureService.remove(id)
    }
}
