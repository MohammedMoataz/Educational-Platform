import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
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

    async findAllByTeacher(teacher_id: string): Promise<CourseDto[]> {
        let user = await this.userRepository.findOneBy({ uuid: teacher_id })
        const courses = await this.courseRepository.find({
            where: {
                teacher_id: user.id,
                _deleted_at: IsNull()
            },
        })
            .then(courses => courses.map(course => plainToClass(CourseDto, course)))

        if (!courses)
            throw new NotFoundException(`Courses not found`)

        return courses
    }

    async findOneById(id: string): Promise<CourseDto> {
        const course = await this.courseRepository.findOne({
            where: { uuid: id },
            relations: ['teacher', 'course_materials', 'lectures', 'enrollments']
        })

        if (course._deleted_at === null) return plainToClass(CourseDto, course)
        else throw new NotFoundException(`Course with id: ${id} not found`)
    }

    async create(newCourse: CreateCourseDto): Promise<Course> {
        let user = await this.userRepository.findOneBy({ uuid: newCourse.teacher_uuid })
        newCourse["teacher_id"] = user.id

        if (user && user._deleted_at === null)
            return await this.courseRepository.save(newCourse)
        else
            throw new NotFoundException(`User with id: ${newCourse.teacher_uuid} not found`)
    }

    async update(id: string, updatedCourse: UpdateCourseDto): Promise<any> {
        return await this.courseRepository.update({ uuid: id }, updatedCourse)
    }

    async remove(id: string): Promise<any> {
        const course = await this.courseRepository.findOneBy({ uuid: id })

        if (!course || course._deleted_at !== null)
            throw new NotFoundException(`Course with id: ${id} not found`)

        return await this.courseRepository.update({ uuid: id }, { _deleted_at: new Date() })
    }
}
