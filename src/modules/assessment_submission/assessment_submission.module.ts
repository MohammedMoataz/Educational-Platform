import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AssessmentSubmissionController } from 'src/controllers/assessment_submission/assessment_submission.controller'
import { Assessment } from 'src/entities/assessment.entity'
import { AssessmentSubmission } from 'src/entities/assessment_submission.entity'
import { User } from 'src/entities/user.entity'
import { AssessmentSubmissionService } from 'src/services/assessment_submission/assessment_submission.service'

@Module({
    imports: [TypeOrmModule.forFeature([AssessmentSubmission, Assessment, User])],
    controllers: [AssessmentSubmissionController],
    providers: [AssessmentSubmissionService],
})

export class AssessmentSubmissionModule { }
