import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { AssessmentSubmission } from 'src/entities/assessment_submission.entity'
import { Assessment } from 'src/entities/assessment.entity'
import { User } from 'src/entities/user.entity'
import { AssessmentSubmissionDto, CreateAssessmentSubmissionDto } from 'src/DTO/assessment_submission.dto'

@Injectable()
export class AssessmentSubmissionService {
    constructor(
        @InjectRepository(AssessmentSubmission)
        @InjectRepository(Assessment)
        @InjectRepository(User)
        private readonly assessmentSubmissionRepository: Repository<AssessmentSubmission>
    ) { }

    async findAll(): Promise<AssessmentSubmission[]> {
        return await this.assessmentSubmissionRepository.find({
            relations: ['student', 'lecture']
        })
    }

    async findOneById(id: number): Promise<AssessmentSubmission> {
        return await this.assessmentSubmissionRepository.findOne({
            where: { id },
            relations: ['student', 'lecture']
        })
    }

    async create(newAssessmentSubmission: CreateAssessmentSubmissionDto): Promise<AssessmentSubmission> {
        return await this.assessmentSubmissionRepository.save(newAssessmentSubmission)
    }
}
