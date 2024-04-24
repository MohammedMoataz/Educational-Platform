import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { AssessmentSubmission } from 'src/entities/assessment_submission.entity'
import { Assessment } from 'src/entities/assessment.entity'
import { User } from 'src/entities/user.entity'
import { AssessmentSubmissionDto, CreateAssessmentSubmissionDto } from 'src/DTO/assessment_submission.dto'

@Injectable()
export class AssessmentSubmissionService {
    constructor(
        @InjectRepository(AssessmentSubmission)
        private readonly assessmentSubmissionRepository: Repository<AssessmentSubmission>,
        @InjectRepository(Assessment)
        private readonly assessmentRepository: Repository<Assessment>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findAllByStudent(student_id: number): Promise<AssessmentSubmissionDto[]> {
        return await this.assessmentSubmissionRepository.find({
            where: { student_id },
            relations: ['student', 'assessment']
        })
            .then(assessmentSubmissions => assessmentSubmissions.map(assessmentSubmission => plainToClass(AssessmentSubmissionDto, assessmentSubmission)))
    }

    async findAllByAssessment(assessment_id: number): Promise<AssessmentSubmissionDto[]> {
        return await this.assessmentSubmissionRepository.find({
            where: { assessment_id },
            relations: ['student', 'assessment']
        })
            .then(assessmentSubmissions => assessmentSubmissions.map(assessmentSubmission => plainToClass(AssessmentSubmissionDto, assessmentSubmission)))
    }

    async findOne(student_id: number, assessment_id: number): Promise<AssessmentSubmissionDto> {
        const assessmentSubmission = await this.assessmentSubmissionRepository.findOne({
            where: { student_id, assessment_id },
            relations: ['student', 'assessment']
        })

        return plainToClass(AssessmentSubmissionDto, assessmentSubmission)
    }

    async create(newAssessmentSubmission: CreateAssessmentSubmissionDto): Promise<AssessmentSubmissionDto> {
        const user = await this.userRepository.findOneBy({ id: newAssessmentSubmission.student_id })
        const assessment = await this.assessmentRepository.findOneBy({ id: newAssessmentSubmission.assessment_id })

        if (!user || !assessment || user._deleted_at !== null || assessment._deleted_at !== null)
            throw new NotFoundException(`User or assessment not found`)

        const assessmentSubmission = await this.assessmentSubmissionRepository.save(newAssessmentSubmission)
        return plainToClass(AssessmentSubmissionDto, assessmentSubmission)
    }
}
