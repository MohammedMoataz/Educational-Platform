import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AssessmentController } from 'src/controllers/assessment/assessment.controller'
import { Assessment } from 'src/entities/assessment.entity'
import { Lecture } from 'src/entities/lecture.entity'
import { AssessmentService } from 'src/services/assessment/assessment.service'

@Module({
    imports: [TypeOrmModule.forFeature([Assessment, Lecture])],
    controllers: [AssessmentController],
    providers: [AssessmentService],
})

export class AssessmentModule { }
