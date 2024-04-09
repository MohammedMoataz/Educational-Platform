import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Course } from 'src/entities/course.entity'
import { CourseMaterial } from 'src/entities/course_material'
import { Enrollment } from 'src/entities/enrollment.entity'
import { Lecture } from 'src/entities/lecture.entity'
import { CourseParams } from 'src/utils/type'
import { CourseDto } from 'src/DTO/course.dto'

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        @InjectRepository(CourseMaterial)
        @InjectRepository(Lecture)
        @InjectRepository(Enrollment)
        private readonly courseRepository: Repository<Course>
    ) { }

    async findAll(): Promise<Course[]> {
        return await this.courseRepository.find({ relations: ['teacher', 'course_materials', 'lectures', 'enrollments'] })
    }

    async findOneById(id: number): Promise<Course> {
        return await this.courseRepository.findOneBy({ id })
    }

    async create(newCourse: CourseParams): Promise<Course> {
        return await this.courseRepository.save(newCourse)
    }

    async update(id: number, updatedCourse: CourseParams): Promise<any> {
        return await this.courseRepository.update({ id }, updatedCourse)
    }

    async remove(id: number): Promise<any> {
        return await this.courseRepository.delete({ id })
    }
}
