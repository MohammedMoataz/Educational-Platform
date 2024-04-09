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
import { AttendanceDto } from 'src/DTO/attendance.dto'
import { AttendanceService } from 'src/services/attendance/attendance.service'
import { AttendanceParams } from 'src/utils/type'

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
    createAttendances(@Body() createAttendancesParams: AttendanceParams) {
        return this.AttendanceService.create(createAttendancesParams)
    }

    @ApiTags("Lecture APIs", "User APIs")
    @Put('/:id')
    updateAttendances(@Query('id', ParseIntPipe) id: number, @Body() updatedAttendancesParams: AttendanceParams) {
        return this.AttendanceService.update(id, updatedAttendancesParams)
    }

    @ApiTags("Lecture APIs", "User APIs")
    @Delete('/:id')
    removeAttendances(@Query('id', ParseIntPipe) id: number) {
        return this.AttendanceService.remove(id)
    }
}
