import {
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
    IsNull,
    Repository
} from 'typeorm'
import { plainToClass } from 'class-transformer'

import { Lecture } from 'src/entities/lecture.entity'
import {
    CreateLectureDto,
    LectureDto,
    UpdateLectureDto
} from 'src/DTO/lecture.dto'
import { Course } from 'src/entities/course.entity'

@Injectable()
export class LectureService {
    constructor(
        @InjectRepository(Lecture)
        private readonly lectureRepository: Repository<Lecture>,
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) { }

    async findAll(): Promise<LectureDto[]> {
        const lectures = await this.lectureRepository.find({
            where: { _deleted_at: IsNull() },
        })
            .then(lectures => lectures.map(lecture => plainToClass(LectureDto, lecture)))

        if (!lectures)
            throw new NotFoundException(`Lectures not found`)

        return lectures
    }

    async findOneById(id: string): Promise<LectureDto> {
        const lecture = await this.lectureRepository.findOne({
            where: {
                uuid: id,
                _deleted_at: IsNull()
            },
        })

        if (lecture) return plainToClass(LectureDto, lecture)
        else throw new NotFoundException(`Lecture with id: ${id} not found`)
    }

    async create(newLecture: CreateLectureDto): Promise<Lecture> {
        const course = await this.courseRepository.findOneBy({
            uuid: newLecture.course_uuid,
            _deleted_at: IsNull()
        })

        if (!course)
            throw new NotFoundException(`Course with id: ${course.id} not found`)

        newLecture["course_id"] = course.id

        return await this.lectureRepository.save(newLecture)
    }

    async update(id: string, updatedLecture: UpdateLectureDto): Promise<any> {
        const lecture = await this.lectureRepository.findOneBy({
            uuid: id,
            _deleted_at: IsNull()
        })

        if (!lecture)
            throw new NotFoundException(`Lecture with id: ${id} not found`)

        return await this.lectureRepository.update({ uuid: id }, updatedLecture)
    }

    async remove(id: string): Promise<any> {
        const lecture = await this.lectureRepository.findOneBy({
            uuid: id,
            _deleted_at: IsNull()
        })

        if (!lecture)
            throw new NotFoundException(`lecture with id: ${id} not found`)

        return this.lectureRepository.update({ uuid: id }, { _deleted_at: new Date() })
            .then(() => "Lecture was deleted successfully")
    }

    async getCourseLectures(course_id: string): Promise<LectureDto[]> {
        const course = await this.courseRepository.findOneBy({
            uuid: course_id,
            _deleted_at: IsNull()
        })

        return await this.lectureRepository.find({
            where: {
                course_id: course.id,
                _deleted_at: IsNull()
            },
        })
            .then(lectures => lectures.map(lecture => plainToClass(LectureDto, lecture)))
    }
}
