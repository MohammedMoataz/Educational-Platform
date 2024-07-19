import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
    IsNull,
    Repository
} from 'typeorm'
import { plainToClass } from 'class-transformer'

import { Assessment } from 'src/entities/assessment.entity'
import { Lecture } from 'src/entities/lecture.entity'
import {
    AssessmentDto,
    CreateAssessmentDto,
    UpdateAssessmentDto
} from 'src/DTO/assessment.dto'

@Injectable()
export class AssessmentService {
    constructor(
        @InjectRepository(Assessment)
        private readonly assessmentRepository: Repository<Assessment>,
        @InjectRepository(Lecture)
        private readonly lectureRepository: Repository<Lecture>
    ) { }

    async findAllByLecture(lecture_id: string): Promise<AssessmentDto[]> {
        const lecture = await this.lectureRepository.findOneBy({ uuid: lecture_id })

        return await this.assessmentRepository.find({
            where: {
                lecture_id: lecture.id,
                _deleted_at: IsNull()
            },
        })
            .then(assessments => assessments.map(assessment => plainToClass(AssessmentDto, assessment)))
    }

    async findAssessmentById(id: string): Promise<AssessmentDto> {
        const assessment = await this.assessmentRepository.findOne({
            where: { uuid: id },
        })

        return plainToClass(AssessmentDto, assessment)
    }

    async create(newAssessment: CreateAssessmentDto): Promise<AssessmentDto> {
        const lecture = await this.lectureRepository.findOneBy({ uuid: newAssessment.lecture_uuid })

        if (!lecture || lecture._deleted_at !== null)
            throw new NotFoundException(`lecture not found`)

        newAssessment["lecture_id"] = lecture.id

        const assessment = await this.assessmentRepository.save(newAssessment)
        return plainToClass(AssessmentDto, assessment)
    }

    async update(id: string, updatedAssessment: UpdateAssessmentDto): Promise<any> {
        const assessment = await this.assessmentRepository.findOneBy({ uuid: id })

        if (!assessment || assessment._deleted_at !== null)
            throw new NotFoundException(`assessment with id: ${id} not found`)

        return await this.assessmentRepository.update({ id: assessment.id }, updatedAssessment)
    }

    async remove(id: string): Promise<any> {
        const assessment = await this.assessmentRepository.findOneBy({ uuid: id })

        if (!assessment || assessment._deleted_at !== null)
            throw new NotFoundException(`assessment with id: ${id} not found`)

        return this.assessmentRepository.update({ id: assessment.id }, { _deleted_at: new Date() })
            .then(() => "Assessment was deleted successfully")
    }
}
