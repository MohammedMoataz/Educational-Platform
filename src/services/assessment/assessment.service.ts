import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { Assessment } from 'src/entities/assessment.entity'
import { Lecture } from 'src/entities/lecture.entity'
import { AssessmentDto, CreateAssessmentDto, UpdateAssessmentDto } from 'src/DTO/assessment.dto'

@Injectable()
export class AssessmentService {
    constructor(
        @InjectRepository(Assessment)
        private readonly assessmentRepository: Repository<Assessment>,
        @InjectRepository(Lecture)
        private readonly lectureRepository: Repository<Assessment>
    ) { }

    async findAllByLecture(lecture_id: number): Promise<AssessmentDto[]> {
        return await this.assessmentRepository.find({
            where: { lecture_id },
            relations: ['assessmentSubmissions', 'lecture']
        })
            .then(assessments => assessments.filter(assessment => assessment._deleted_at === null))
            .then(assessments => assessments.map(assessment => plainToClass(AssessmentDto, assessment)))
    }

    async findOneById(id: number): Promise<AssessmentDto> {
        const assessment = await this.assessmentRepository.findOne({
            where: { id },
            relations: ['assessmentSubmissions', 'lecture']
        })

        return plainToClass(AssessmentDto, assessment)
    }

    async create(newAssessment: CreateAssessmentDto): Promise<AssessmentDto> {
        const lecture = await this.lectureRepository.findOneBy({ id: newAssessment.lecture_id })

        if (!lecture || lecture._deleted_at !== null)
            throw new NotFoundException(`lecture not found`)

        const assessment = await this.assessmentRepository.save(newAssessment)
        return plainToClass(AssessmentDto, assessment)
    }

    async update(id: number, updatedAssessment: UpdateAssessmentDto): Promise<any> {
        const assessment = await this.assessmentRepository.findOneBy({ id })


        if (!assessment || assessment._deleted_at !== null)
            throw new NotFoundException(`assessment with id: ${id} not found`)

        return await this.assessmentRepository.update({ id: assessment.id }, updatedAssessment)
    }

    async remove(id: number): Promise<any> {
        const assessment = await this.assessmentRepository.findOneBy({ id })


        if (!assessment || assessment._deleted_at !== null)
            throw new NotFoundException(`assessment with id: ${id} not found`)

        return await this.assessmentRepository.update({ id: assessment.id }, { _deleted_at: new Date() })
    }
}
