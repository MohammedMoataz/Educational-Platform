import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from 'src/controllers/user/user.controller'
import { UserService } from 'src/services/user/user.service'

import { User } from 'src/entities/user.entity'
import { AssessmentSubmission } from 'src/entities/assessment_submission.entity'
import { Attendance } from 'src/entities/attendance.entity'
import { Enrollment } from 'src/entities/enrollment.entity'
import { ValidateUserMiddleware } from 'src/middlewares/validate-user.middleware'

@Module({
    imports: [TypeOrmModule.forFeature([User, Enrollment, Attendance, AssessmentSubmission])],
    controllers: [UserController],
    providers: [UserService],
})

export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ValidateUserMiddleware)
            .forRoutes(UserController)
    }
}
