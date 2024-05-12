import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToClass } from 'class-transformer'
import { Repository } from 'typeorm'

import { Enrollment } from 'src/entities/enrollment.entity'
import { Course } from 'src/entities/course.entity'
import { User } from 'src/entities/user.entity'
import { CreateEnrollmentDto, EnrollmentDto } from 'src/DTO/enrollment.dto'

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
        const user = await this.userRepository.findOneBy({ id: student_id })

        if (!user._deleted_at)
            return await this.enrollmentRepository.find({
                where: { student_id },
                relations: ['course', 'student']
            })
                .then(enrollments => enrollments.filter(enrollment => enrollment._deleted_at === null))
                .then(enrollments => enrollments.map(enrollment => plainToClass(EnrollmentDto, enrollment)))

        else
            throw new NotFoundException(`User not found`)
    }

    async findAllbyCourse(course_id: number): Promise<EnrollmentDto[]> {
        const course = await this.courseRepository.findOneBy({ id: course_id })

        if (!course._deleted_at)
            return await this.enrollmentRepository.find({
                where: { course_id },
                relations: ['course', 'student']
            })
                .then(enrollments => enrollments.filter(enrollment => enrollment._deleted_at === null))
                .then(enrollments => enrollments.map(enrollment => plainToClass(EnrollmentDto, enrollment)))
        else
            throw new NotFoundException(`Course not found`)
    }

    async findOne(student_id: number, course_id: number): Promise<EnrollmentDto> {
        const user = await this.userRepository.findOneBy({ id: student_id })
        const course = await this.courseRepository.findOneBy({ id: course_id })

        if (user && course && user._deleted_at === null && course._deleted_at === null)
            return await this.enrollmentRepository.findOne({
                where: { student_id, course_id },
                relations: ['course', 'student']
            })
                .then(enrollment => {
                    if (enrollment && enrollment._deleted_at === null)
                        return plainToClass(EnrollmentDto, enrollment)
                    else
                        throw new NotFoundException(`Enrollment not found`)
                })
        else
            throw new NotFoundException(`User or course not found`)
    }

    async create(newEnrollment: CreateEnrollmentDto): Promise<EnrollmentDto> {
        const user = await this.userRepository.findOneBy({ id: newEnrollment.student_id })
        const course = await this.courseRepository.findOneBy({ id: newEnrollment.course_id })

        if (!user || !course || user._deleted_at !== null || course._deleted_at !== null)
            throw new NotFoundException(`User or course not found`)

        const enrollment = await this.enrollmentRepository.save(newEnrollment)
        return plainToClass(EnrollmentDto, enrollment)
    }

    async remove(student_id: number, course_id: number): Promise<any> {
        const user = await this.userRepository.findOneBy({ id: student_id })
        const course = await this.courseRepository.findOneBy({ id: course_id })

        if (user && course && user._deleted_at === null && course._deleted_at === null)
            return await this.enrollmentRepository.findOne({
                where: {
                    student_id: user.id,
                    course_id: course.id
                }
            })
                .then(async enrollment => {
                    if (enrollment && enrollment._deleted_at === null)
                        return this.enrollmentRepository.update({ id: enrollment.id }, { _deleted_at: new Date() })
                            .then(() => "Enrollment deleted successfully")
                    else
                        throw new NotFoundException(`Enrollment not found`)
                })
        else
            throw new NotFoundException(`User or course not found`)
    }
}
