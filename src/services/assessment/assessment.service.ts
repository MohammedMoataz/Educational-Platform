import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Assessment } from 'src/entities/assessment.entity'
import { AssessmentSubmission } from 'src/entities/assessment_submission.entity'
import { Lecture } from 'src/entities/lecture.entity'
import { AssessmentDto } from 'src/DTO/assessment.dto'
import { AssessmentParams } from 'src/utils/type'

@Injectable()
export class AssessmentService {
    constructor(
        @InjectRepository(Assessment)
        @InjectRepository(Lecture)
        @InjectRepository(AssessmentSubmission)
        private readonly assessmentRepository: Repository<Assessment>
    ) { }

    async findAll(): Promise<Assessment[]> {
        return await this.assessmentRepository.find({ relations: ['student', 'lecture'] })
    }

    async findOneById(id: number): Promise<Assessment> {
        return await this.assessmentRepository.findOneBy({ id })
    }

    async create(newAssessment: AssessmentParams): Promise<Assessment> {
        return await this.assessmentRepository.save(newAssessment)
    }

    async update(id: number, updatedAssessment: AssessmentParams): Promise<any> {
        return await this.assessmentRepository.update({ id }, updatedAssessment)
    }

    async remove(id: number): Promise<any> {
        return await this.assessmentRepository.delete({ id })
    }
}
