import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Lecture } from 'src/entities/lecture.entity'
import { Attendance } from 'src/entities/attendance.entity'
import { Course } from 'src/entities/course.entity'
import { Assessment } from 'src/entities/assessment.entity'
import { LectureParams } from 'src/utils/type'
import { LectureDto } from 'src/DTO/lecture.dto'

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
        return await this.lectureRepository.find({ relations: ['courses', 'enrollments', 'attendances', 'assessmentSubmissions'] })
    }

    async findOneById(id: number): Promise<Lecture> {
        return await this.lectureRepository.findOneBy({ id })
    }

    async create(newLecture: LectureParams): Promise<Lecture> {
        return await this.lectureRepository.save(newLecture)
    }

    async update(id: number, updatedLecture: LectureParams): Promise<any> {
        return await this.lectureRepository.update({ id }, updatedLecture)
    }

    async remove(id: number): Promise<any> {
        return await this.lectureRepository.delete({ id })
    }
}
