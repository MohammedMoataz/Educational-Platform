import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Lecture } from 'src/entities/lecture.entity'
import { Attendance } from 'src/entities/attendance.entity'
import { Course } from 'src/entities/course.entity'
import { Assessment } from 'src/entities/assessment.entity'
import { CreateLectureDto, LectureDto, UpdateLectureDto } from 'src/DTO/lecture.dto'

@Injectable()
export class LectureService {
    constructor(
        @InjectRepository(Lecture)
        @InjectRepository(Course)
        @InjectRepository(Attendance)
        @InjectRepository(Assessment)
        private readonly lectureRepository: Repository<Lecture>
    ) { }

    async findAll(): Promise<Lecture[]> {
        return await this.lectureRepository.find({
            relations: ['course', 'assessments', 'attendances']
        })
    }

    async findOneById(id: number): Promise<Lecture> {
        return await this.lectureRepository.findOne({
            where: { id },
            relations: ['course', 'assessments', 'attendances']
        })
    }

    async create(newLecture: CreateLectureDto): Promise<Lecture> {
        return await this.lectureRepository.save(newLecture)
    }

    async update(id: number, updatedLecture: UpdateLectureDto): Promise<any> {
        return await this.lectureRepository.update({ id }, updatedLecture)
    }

    async remove(id: number): Promise<any> {
        return await this.lectureRepository.delete({ id })
    }
}
