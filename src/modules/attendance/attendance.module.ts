import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AttendanceController } from 'src/controllers/attendance/attendance.controller'
import { Attendance } from 'src/entities/attendance.entity'
import { Lecture } from 'src/entities/lecture.entity'
import { User } from 'src/entities/user.entity'
import { AttendanceService } from 'src/services/attendance/attendance.service'

@Module({
    imports: [TypeOrmModule.forFeature([Attendance, Lecture, User])],
    controllers: [AttendanceController],
    providers: [AttendanceService],
})

export class AttendanceModule { }