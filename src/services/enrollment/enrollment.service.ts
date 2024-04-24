import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToClass } from 'class-transformer'
import { Repository } from 'typeorm'

import { Enrollment } from 'src/entities/enrollment.entity'
import { Course } from 'src/entities/course.entity'
import { User } from 'src/entities/user.entity'
import { CreateEnrollmentDto, DeletedEnrollmentDto, EnrollmentDto } from 'src/DTO/enrollment.dto'

@Injectable()
export class EnrollmentService {
    constructor(
        @InjectRepository(Enrollment)
        private readonly enrollmentRepository: Repository<Enrollment>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) { }

    async findAllbyUser(student_id: number): Promise<EnrollmentDto[]> {
        return await this.enrollmentRepository.find({
            where: { student_id },
            relations: ['course', 'student']
        })
            .then(enrollments => enrollments.filter(enrollment => enrollment._deleted_at === null))
            .then(enrollments => enrollments.map(enrollment => plainToClass(EnrollmentDto, enrollment)))
    }

    async findAllbyCourse(course_id: number): Promise<EnrollmentDto[]> {
        return await this.enrollmentRepository.find({
            where: { course_id },
            relations: ['course', 'student']
        })
            .then(enrollments => enrollments.filter(enrollment => enrollment._deleted_at === null))
            .then(enrollments => enrollments.map(enrollment => plainToClass(EnrollmentDto, enrollment)))
    }

    async findOne(student_id: number, course_id: number): Promise<EnrollmentDto> {
        const enrollment = await this.enrollmentRepository.findOne({
            where: { student_id, course_id },
            relations: ['course', 'student']
        })

        return plainToClass(EnrollmentDto, enrollment)
    }

    async create(newEnrollment: CreateEnrollmentDto): Promise<EnrollmentDto> {
        const user = await this.userRepository.findOneBy({ id: newEnrollment.student_id })
        const course = await this.courseRepository.findOneBy({ id: newEnrollment.course_id })

        if (!user || !course || user._deleted_at !== null || course._deleted_at !== null)
            throw new NotFoundException(`User or course not found`)

        const enrollment = await this.enrollmentRepository.save(newEnrollment)
        return plainToClass(EnrollmentDto, enrollment)
    }

    async remove(deletedEnrollment: DeletedEnrollmentDto): Promise<any> {
        const user = await this.userRepository.findOneBy({ id: deletedEnrollment.student_id })
        const course = await this.courseRepository.findOneBy({ id: deletedEnrollment.course_id })
        const enrollment = await this.enrollmentRepository.findOne({
            where: {
                student_id: user.id,
                course_id: course.id
            }
        })


        if (!user || !course || user._deleted_at !== null || course._deleted_at !== null)
            throw new NotFoundException(`User or course not found`)

        return await this.enrollmentRepository.update({ id: enrollment.id }, { _deleted_at: new Date() })
    }
}
