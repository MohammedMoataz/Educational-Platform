import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { Course } from 'src/entities/course.entity'
import { CourseDto, CreateCourseDto, UpdateCourseDto } from 'src/DTO/course.dto'
import { User } from 'src/entities/user.entity'
import { ROLES } from 'src/utils/constants'

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async findAll(): Promise<CourseDto[]> {
        const courses = await this.courseRepository.findBy({
            _deleted_at: IsNull()
        })
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
            where: {
                uuid: id,
                _deleted_at: IsNull()
            },
        })

        if (course) return plainToClass(CourseDto, course)
        else throw new NotFoundException(`Course with id: ${id} not found`)
    }

    async create(newCourse: CreateCourseDto): Promise<Course> {
        const teacher = await this.userRepository.findOneBy({ uuid: newCourse.teacher_uuid })

        if (!teacher || teacher.role !== ROLES.TEACHER)
            throw new NotFoundException(`Teacher not found`)

        newCourse["teacher_id"] = teacher.id

        if (teacher && teacher._deleted_at === null)
            return await this.courseRepository.save(newCourse)
        else
            throw new NotFoundException(`Teacher with id: ${newCourse.teacher_uuid} not found`)
    }

    async update(id: string, updatedCourse: UpdateCourseDto): Promise<any> {
        const course = await this.courseRepository.findOneBy({
            uuid: id,
            _deleted_at: IsNull()
        })
        const teacher = await this.userRepository.findOneBy({
            uuid: updatedCourse.teacher_uuid,
            _deleted_at: IsNull()
        })

        if (!course)
            throw new NotFoundException(`Course with id: ${id} not found`)

        if (teacher) {
            if (teacher.role !== ROLES.TEACHER)
                throw new NotFoundException(`Teacher not found`)

            const result = await this.courseRepository.update({ uuid: id }, {
                name: updatedCourse.name,
                description: updatedCourse.description,
                teacher_id: teacher.id,
                _updated_at: new Date()
            })

            if (result) return "Course was updated successfully"
        } else {
            throw new NotFoundException(`Teacher not found`)
        }
    }

    async remove(id: string): Promise<any> {
        const course = await this.courseRepository.findOneBy({ uuid: id })

        if (!course || course._deleted_at !== null)
            throw new NotFoundException(`Course with id: ${id} not found`)

        return this.courseRepository.update({ uuid: id }, { _deleted_at: new Date() })
            .then(() => "Course was deleted successfully")
    }
}
