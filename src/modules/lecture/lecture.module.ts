import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LectureController } from 'src/controllers/lecture/lecture.controller'
import { Assessment } from 'src/entities/assessment.entity'
import { Attendance } from 'src/entities/attendance.entity'
import { Course } from 'src/entities/course.entity'
import { Lecture } from 'src/entities/lecture.entity'
import { LectureService } from 'src/services/lecture/lecture.service'

@Module({
    imports: [TypeOrmModule.forFeature([Lecture, Course, Attendance, Assessment])],
    controllers: [LectureController],
    providers: [LectureService],
})

export class LectureModule { }
