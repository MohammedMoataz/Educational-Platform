import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { Lecture } from 'src/entities/lecture.entity'
import { CreateLectureDto, LectureDto, UpdateLectureDto } from 'src/DTO/lecture.dto'

@Injectable()
export class LectureService {
    constructor(
        @InjectRepository(Lecture)
        private readonly lectureRepository: Repository<Lecture>,
    ) { }

    async findAll(): Promise<LectureDto[]> {
        const lectures = await this.lectureRepository.find({
            relations: ['course', 'assessments', 'attendances']
        })
            .then(lectures => lectures.filter(lecture => lecture._deleted_at === null))
            .then(lectures => lectures.map(lecture => plainToClass(LectureDto, lecture)))

        if (!lectures)
            throw new NotFoundException(`Lectures not found`)

        return lectures
    }

    async findOneById(id: number): Promise<LectureDto> {
        const lecture = await this.lectureRepository.findOne({
            where: { id },
            relations: ['course', 'assessments', 'attendances']
        })

        if (lecture._deleted_at === null) return plainToClass(LectureDto, lecture)
        else throw new NotFoundException(`Lecture with id: ${id} not found`)
    }

    async create(newLecture: CreateLectureDto): Promise<Lecture> {
        return await this.lectureRepository.save(newLecture)
    }

    async update(id: number, updatedLecture: UpdateLectureDto): Promise<any> {
        const lecture = await this.lectureRepository.findOneBy({ id })

        if (!lecture || lecture._deleted_at !== null)
            throw new NotFoundException(`Lecture with id: ${id} not found`)

        return await this.lectureRepository.update({ id }, updatedLecture)
    }

    async remove(id: number): Promise<any> {
        const lecture = await this.lectureRepository.findOneBy({ id })

        if (!lecture || lecture._deleted_at !== null)
            throw new NotFoundException(`lecture with id: ${id} not found`)

        return await this.lectureRepository.update({ id }, { _deleted_at: new Date() })
    }

    async getCourseLectures(course_id: number): Promise<LectureDto[]> {
        return await this.lectureRepository.find({
            where: { course_id },
            relations: ['course']
        })
            .then(lectures => lectures.filter(lecture => lecture._deleted_at === null))
            .then(lectures => lectures.map(lecture => plainToClass(LectureDto, lecture)))
    }
}
