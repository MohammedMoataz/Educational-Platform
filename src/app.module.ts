import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from './entities/user.entity'
import { Lecture } from './entities/lecture.entity'
import { Enrollment } from './entities/enrollment.entity'
import { Course } from './entities/course.entity'
import { CourseMaterial } from './entities/course_material'
import { Assessment } from './entities/assessment.entity'
import { AssessmentSubmission } from './entities/assessment_submission.entity'

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
import { Attendance } from './entities/attendance.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // type: 'mysql' as DatabaseType,
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root123',
      database: 'educational_platform',
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
      synchronize: true,
      // autoLoadEntities: true,
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
export class AppModule { }
