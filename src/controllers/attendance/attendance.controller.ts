import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import JwtAuthGuard from 'src/auth/guards/jwt.guard'

import { CreateAttendanceDto } from 'src/DTO/attendance.dto'
import { AttendanceService } from 'src/services/attendance/attendance.service'

@ApiBearerAuth('JWT')
@Controller()
export class AttendanceController {
    constructor(private AttendanceService: AttendanceService) { }

    @ApiTags("User APIs")
    @Get('student/attendances')
    @UseGuards(JwtAuthGuard)
    getStudentAttendances(@Query('student_id') student_id: string) {
        return this.AttendanceService.findAllByStudent(student_id)
    }

    @ApiTags("Lecture APIs")
    @Get('lecture/attendances')
    @UseGuards(JwtAuthGuard)
    getLectureAttendances(@Query('lecture_id') lecture_id: string) {
        return this.AttendanceService.findAllByLecture(lecture_id)
    }

    @ApiTags("Lecture APIs", "User APIs")
    @Get('attendance')
    @UseGuards(JwtAuthGuard)
    getAttendances(
        @Query('student_id') student_id: string,
        @Query('lecture_id') lecture_id: string
    ) {
        return this.AttendanceService.findAttendance(student_id, lecture_id)
    }

    @ApiTags("Lecture APIs", "User APIs")
    @Post('attendance')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    createAttendances(@Body() newAttendances: CreateAttendanceDto) {
        return this.AttendanceService.create(newAttendances)
    }

    @ApiTags("Lecture APIs", "User APIs")
    @Delete('attendance')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    removeAttendances(
        @Query('student_id') student_id: string,
        @Query('lecture_id') lecture_id: string
    ) {
        return this.AttendanceService.remove(student_id, lecture_id)
    }
}
