import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { CreateAttendanceDto } from 'src/DTO/attendance.dto'
import { AttendanceService } from 'src/services/attendance/attendance.service'

@ApiBearerAuth('JWT')
@Controller()
export class AttendanceController {
    constructor(private AttendanceService: AttendanceService) { }

    @ApiTags("User APIs")
    @Get('student/attendances')
    getStudentAttendances(@Query('student_id') student_id: string) {
        return this.AttendanceService.findAllByStudent(student_id)
    }

    @ApiTags("Lecture APIs")
    @Get('lecture/attendances')
    getLectureAttendances(@Query('lecture_id') lecture_id: string) {
        return this.AttendanceService.findAllByLecture(lecture_id)
    }

    @ApiTags("Lecture APIs", "User APIs")
    @Get('attendance')
    getAttendances(
        @Query('student_id') student_id: string,
        @Query('lecture_id') lecture_id: string
    ) {
        return this.AttendanceService.findAttendance(student_id, lecture_id)
    }

    @ApiTags("Lecture APIs", "User APIs")
    @Post('attendance')
    @UsePipes(ValidationPipe)
    createAttendances(@Body() newAttendances: CreateAttendanceDto) {
        return this.AttendanceService.create(newAttendances)
    }

    @ApiTags("Lecture APIs", "User APIs")
    @Delete('attendance')
    @UsePipes(ValidationPipe)
    removeAttendances(
        @Query('student_id') student_id: string,
        @Query('lecture_id') lecture_id: string
    ) {
        return this.AttendanceService.remove(student_id, lecture_id)
    }
}
