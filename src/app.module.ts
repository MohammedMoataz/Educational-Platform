import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from 'dotenv'

import { User } from './entities/user.entity'
import { Lecture } from './entities/lecture.entity'
import { Enrollment } from './entities/enrollment.entity'
import { Course } from './entities/course.entity'
import { CourseMaterial } from './entities/course_material.entity'
import { Attendance } from './entities/attendance.entity'
import { Assessment } from './entities/assessment.entity'
import { AssessmentSubmission } from './entities/assessment_submission.entity'

import { AppService } from './app.service'

import { AppController } from './app.controller'

import { AuthModule } from './auth/modules/auth.module'
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

const DB_URL = process.env.DB_URL as string
const DB_HOST = process.env.DB_HOST as string
const DB_NAME = process.env.DB_NAME as string
const DB_USER = process.env.DB_USER as string
const DB_PASSWORD = process.env.DB_PASSWORD as string

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // type: 'mysql' as DatabaseType,
      url: DB_URL,
      host: DB_HOST,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      // entities: [__dirname + '/entities/*.entity.ts'],
      entities: [
        User,
        Lecture,
        Enrollment,
        Course,
        CourseMaterial,
        Attendance,
        Assessment,
        AssessmentSubmission,
      ],
      // autoLoadEntities: true,
      connectorPackage: 'mysql',
      connectTimeout: 60 * 60 * 1000,
    }),
    AuthModule,
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
