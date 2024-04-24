import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from 'dotenv'

import { AppService } from './app.service'

import { AppController } from './app.controller'

import { UserModule } from './modules/user/user.module'
import { LectureModule } from './modules/lecture/lecture.module'
import { EnrollmentModule } from './modules/enrollment/enrollment.module'
import { CourseModule } from './modules/course/course.module'
import { CourseMaterialModule } from './modules/course_material/course_material.module'
import { AssessmentModule } from './modules/assessment/assessment.module'
import { AssessmentSubmissionModule } from './modules/assessment_submission/assessment_submission.module'
import { AttendanceModule } from './modules/attendance/attendance.module'

import { CreateLogger, UpdateLogger } from './middlewares/date-logger.middleware'

config()

const DB_PORT = process.env.DB_PORT as string
const DB_HOST = process.env.DB_HOST as string
const DB_NAME = process.env.DB_NAME as string
const DB_USER = process.env.DB_USER as string
const DB_PASSWORD = process.env.DB_PASSWORD as string

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // type: 'mysql' as DatabaseType,
      host: DB_HOST,
      port: parseInt(DB_PORT),
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [__dirname + '/entities/*.entity.ts'],
      // entities: [
      //   User,
      //   Lecture,
      //   Enrollment,
      //   Course,
      //   CourseMaterial,
      //   Attendance,
      //   Assessment,
      //   AssessmentSubmission,
      // ],
      // autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    LectureModule,
    EnrollmentModule,
    CourseModule,
    CourseMaterialModule,
    AttendanceModule,
    AssessmentModule,
    AssessmentSubmissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CreateLogger)
      .forRoutes(
        {
          path: "*",
          method: RequestMethod.POST
        }
      )
      .apply(UpdateLogger)
      .forRoutes(
        {
          path: "*",
          method: RequestMethod.PUT
        }
      )
  }
}

