import {
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { AssessmentSubmission } from 'src/entities/assessment_submission.entity'
import { Assessment } from 'src/entities/assessment.entity'
import { User } from 'src/entities/user.entity'
import {
    AssessmentSubmissionDto,
    CreateAssessmentSubmissionDto
} from 'src/DTO/assessment_submission.dto'

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

    async findAllByStudent(student_id: string): Promise<AssessmentSubmissionDto[]> {
        const student = await this.userRepository.findOneBy({
            uuid: student_id,
            _deleted_at: IsNull()
        })

        if (!student)
            throw new NotFoundException(`User or assessment not found`)

        return await this.assessmentSubmissionRepository.find({
            where: { student_id: student.id },
        })
            .then(assessmentSubmissions => assessmentSubmissions.map(assessmentSubmission => plainToClass(AssessmentSubmissionDto, assessmentSubmission)))
    }

    async findAllByAssessment(assessment_id: string): Promise<AssessmentSubmissionDto[]> {
        const assessment = await this.assessmentRepository.findOneBy({
            uuid: assessment_id,
            _deleted_at: IsNull()
        })

        if (!assessment)
            throw new NotFoundException(`User or assessment not found`)

        return await this.assessmentSubmissionRepository.find({
            where: { assessment_id: assessment.id },
        })
            .then(assessmentSubmissions => assessmentSubmissions.map(assessmentSubmission => plainToClass(AssessmentSubmissionDto, assessmentSubmission)))
    }

    async findAssessmentSubmission(student_id: string, assessment_id: string): Promise<AssessmentSubmissionDto> {
        const student = await this.userRepository.findOneBy({
            uuid: student_id,
            _deleted_at: IsNull()
        })
        const assessment = await this.assessmentRepository.findOneBy({
            uuid: assessment_id,
            _deleted_at: IsNull()
        })

        if (!student || !assessment)
            throw new NotFoundException(`Student or assessment not found`)

        const assessmentSubmission = await this.assessmentSubmissionRepository.findOne({
            where: {
                student_id: student.id,
                assessment_id: assessment.id
            },
        })

        return plainToClass(AssessmentSubmissionDto, assessmentSubmission)
    }

    async create(newAssessmentSubmission: CreateAssessmentSubmissionDto): Promise<AssessmentSubmissionDto> {
        const user = await this.userRepository.findOneBy({
            uuid: newAssessmentSubmission.student_uuid,
            _deleted_at: IsNull()
        })
        const assessment = await this.assessmentRepository.findOneBy({
            uuid: newAssessmentSubmission.assessment_uuid,
            _deleted_at: IsNull()
        })

        if (!user || !assessment)
            throw new NotFoundException(`User or assessment not found`)

        newAssessmentSubmission["student_id"] = user.id
        newAssessmentSubmission["assessment_id"] = assessment.id

        const assessmentSubmission = await this.assessmentSubmissionRepository.save(newAssessmentSubmission)
        return plainToClass(AssessmentSubmissionDto, assessmentSubmission)
    }
}
