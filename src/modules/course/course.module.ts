import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CourseController } from 'src/controllers/course/course.controller'
import { Course } from 'src/entities/course.entity'
import { CourseMaterial } from 'src/entities/course_material'
import { Enrollment } from 'src/entities/enrollment.entity'
import { Lecture } from 'src/entities/lecture.entity'
import { CourseService } from 'src/services/course/course.service'

@Module({
    imports: [TypeOrmModule.forFeature([Course, CourseMaterial, Lecture, Enrollment])],
    controllers: [CourseController],
    providers: [CourseService],
})

export class CourseModule { }
