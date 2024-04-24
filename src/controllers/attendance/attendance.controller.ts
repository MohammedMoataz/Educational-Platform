import {
    Body,
    Controller,
    Delete,
    Get,
    ParseIntPipe,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateAttendanceDto, DeleteAttendanceDto } from 'src/DTO/attendance.dto'
import { AttendanceService } from 'src/services/attendance/attendance.service'

@Controller()
export class AttendanceController {
    constructor(private AttendanceService: AttendanceService) { }

    @ApiTags("User APIs")
    @Get('student/attendances')
    getStudentAttendances(@Query('student_id', ParseIntPipe) student_id: number) {
        return this.AttendanceService.findAllByStudent(student_id)
    }

    @ApiTags("Lecture APIs")
    @Get('lecture/attendances')
    getLectureAttendances(@Query('lecture_id', ParseIntPipe) lecture_id: number) {
        return this.AttendanceService.findAllByLecture(lecture_id)
    }

    @ApiTags("Lecture APIs", "User APIs")
    @Get('attendance')
    getAttendances(
        @Query('student_id', ParseIntPipe) student_id: number,
        @Query('lecture_id', ParseIntPipe) lecture_id: number
    ) {
        return this.AttendanceService.findOne(student_id, lecture_id)
    }

    @ApiTags("Lecture APIs", "User APIs")
    @Post('attendances')
    @UsePipes(ValidationPipe)
    createAttendances(@Body() newAttendances: CreateAttendanceDto) {
        return this.AttendanceService.create(newAttendances)
    }

    @ApiTags("Lecture APIs", "User APIs")
    @Delete('attendances')
    @UsePipes(ValidationPipe)
    removeAttendances(@Query('deletedEnrollment', ParseIntPipe) deletedAttendance: DeleteAttendanceDto) {
        return this.AttendanceService.remove(deletedAttendance)
    }
}
