import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EnrollmentController } from 'src/controllers/enrollment/enrollment.controller'
import { Course } from 'src/entities/course.entity'
import { Enrollment } from 'src/entities/enrollment.entity'
import { User } from 'src/entities/user.entity'
import { EnrollmentService } from 'src/services/enrollment/enrollment.service'

@Module({
    imports: [TypeOrmModule.forFeature([Enrollment, Course, User])],
    controllers: [EnrollmentController],
    providers: [EnrollmentService],
})

export class EnrollmentModule { }
