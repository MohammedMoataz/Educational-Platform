import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { AssessmentSubmission } from 'src/entities/assessment_submission.entity'
import { Assessment } from 'src/entities/assessment.entity'
import { User } from 'src/entities/user.entity'
import { AssessmentSubmissionDto } from 'src/DTO/assessment_submission.dto'
import { AssessmentSubmissionParams } from 'src/utils/type'

@Injectable()
export class AssessmentSubmissionService {
    constructor(
        @InjectRepository(AssessmentSubmission)
        @InjectRepository(Assessment)
        @InjectRepository(User)
        private readonly assessmentSubmissionRepository: Repository<AssessmentSubmission>
    ) { }

    async findAll(): Promise<AssessmentSubmission[]> {
        return await this.assessmentSubmissionRepository.find({ relations: ['student', 'lecture'] })
    }

    async findOneById(id: number): Promise<AssessmentSubmission> {
        return await this.assessmentSubmissionRepository.findOneBy({ id })
    }

    async create(newAssessmentSubmission: AssessmentSubmissionParams): Promise<AssessmentSubmission> {
        return await this.assessmentSubmissionRepository.save(newAssessmentSubmission)
    }

    async update(id: number, updatedAssessmentSubmission: AssessmentSubmissionParams): Promise<any> {
        return await this.assessmentSubmissionRepository.update({ id }, updatedAssessmentSubmission)
    }

    async remove(id: number): Promise<any> {
        return await this.assessmentSubmissionRepository.delete({ id })
    }
}
