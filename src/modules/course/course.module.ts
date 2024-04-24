import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CourseController } from 'src/controllers/course/course.controller'
import { CourseService } from 'src/services/course/course.service'
import { Course } from 'src/entities/course.entity'
import { User } from 'src/entities/user.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Course, User])],
    controllers: [CourseController],
    providers: [CourseService],
})

export class CourseModule { }
