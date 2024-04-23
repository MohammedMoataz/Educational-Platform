import {
    Body,
    Controller,
    Get,
    Post,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AttendanceDto, CreateAttendanceDto } from 'src/DTO/attendance.dto'
import { AttendanceService } from 'src/services/attendance/attendance.service'

@Controller('attendance')
export class AttendanceController {
    constructor(private AttendanceService: AttendanceService) { }

    @ApiTags("Lecture APIs", "User APIs")
    @Get('/all')
    getAttendancess() {
        return this.AttendanceService.findAll()
    }

    @ApiTags("Lecture APIs", "User APIs")
    @Get('/:id')
    getAttendances(id: number) {
        return this.AttendanceService.findOneById(id)
    }

    @ApiTags("Lecture APIs", "User APIs")
    @Post()
    createAttendances(@Body() newAttendances: CreateAttendanceDto) {
        return this.AttendanceService.create(newAttendances)
    }
}
