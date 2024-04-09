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
import { LectureDto } from 'src/DTO/lecture.dto'
import { LectureService } from 'src/services/lecture/lecture.service'
import { LectureParams } from 'src/utils/type'

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
    createLecture(@Body() createLectureParams: LectureParams) {
        return this.lectureService.create(createLectureParams)
    }

    @ApiTags('Lecture APIs')
    @Put('/:id')
    updateLecture(@Query('id', ParseIntPipe) id: number, @Body() updatedLectureParams: LectureParams) {
        return this.lectureService.update(id, updatedLectureParams)
    }

    @ApiTags('Lecture APIs')
    @Delete('/:id')
    removeLecture(@Query('id', ParseIntPipe) id: number) {
        return this.lectureService.remove(id)
    }
}
