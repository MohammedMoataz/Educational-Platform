import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from 'src/controllers/user/user.controller'
import { UserService } from 'src/services/user/user.service'

import { User } from 'src/entities/user.entity'
import { AssessmentSubmission } from 'src/entities/assessment_submission.entity'
import { Attendance } from 'src/entities/attendance.entity'
import { Enrollment } from 'src/entities/enrollment.entity'

@Module({
    imports: [TypeOrmModule.forFeature([User, Enrollment, Attendance, AssessmentSubmission])],
    controllers: [UserController],
    providers: [UserService],
})

export class UserModule { }
