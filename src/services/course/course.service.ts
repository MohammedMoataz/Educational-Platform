import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { Course } from 'src/entities/course.entity'
import { CourseDto, CreateCourseDto, UpdateCourseDto } from 'src/DTO/course.dto'
import { User } from 'src/entities/user.entity'

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async findAll(): Promise<CourseDto[]> {
        const courses = await this.courseRepository.find({
            relations: ['teacher', 'course_materials', 'lectures', 'enrollments']
        })
            .then(courses => courses.filter(course => course._deleted_at === null))
            .then(courses => courses.map(course => plainToClass(CourseDto, course)))

        if (!courses)
            throw new NotFoundException(`Courses not found`)

        return courses
    }

    async findAllByTeacher(teacher_id): Promise<CourseDto[]> {
        const courses = await this.courseRepository.find({
            where: { teacher_id },
            relations: ['teacher', 'course_materials', 'lectures', 'enrollments']
        })
            .then(courses => courses.filter(course => course._deleted_at === null))
            .then(courses => courses.map(course => plainToClass(CourseDto, course)))

        if (!courses)
            throw new NotFoundException(`Courses not found`)

        return courses
    }

    async findOneById(id: number): Promise<CourseDto> {
        const course = await this.courseRepository.findOne({
            where: { id },
            relations: ['teacher', 'course_materials', 'lectures', 'enrollments']
        })

        if (course._deleted_at === null) return plainToClass(CourseDto, course)
        else throw new NotFoundException(`Course with id: ${id} not found`)
    }

    async create(newCourse: CreateCourseDto): Promise<Course> {
        let user = await this.userRepository.findOneBy({ id: newCourse.teacher_id })

        if (user && user._deleted_at === null)
            return await this.courseRepository.save(newCourse)
        else
            throw new NotFoundException(`User with id: ${newCourse.teacher_id} not found`)
    }

    async update(id: number, updatedCourse: UpdateCourseDto): Promise<any> {
        return await this.courseRepository.update({ id }, updatedCourse)
    }

    async remove(id: number): Promise<any> {
        const course = await this.courseRepository.findOneBy({ id })

        if (!course || course._deleted_at !== null)
            throw new NotFoundException(`Course with id: ${id} not found`)

        return await this.courseRepository.update({ id }, { _deleted_at: new Date() })
    }
}
