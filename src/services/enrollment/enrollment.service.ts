import {
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToClass } from 'class-transformer'
import {
    IsNull,
    Repository
} from 'typeorm'

import { Enrollment } from 'src/entities/enrollment.entity'
import { Course } from 'src/entities/course.entity'
import { User } from 'src/entities/user.entity'
import {
    CreateEnrollmentDto,
    EnrollmentDto
} from 'src/DTO/enrollment.dto'

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

    async findAllbyUser(student_id: string): Promise<EnrollmentDto[]> {
        const user = await this.userRepository.findOneBy({ uuid: student_id })

        if (!user._deleted_at)
            return await this.enrollmentRepository.find({
                where: {
                    student_id: user.id,
                    _deleted_at: IsNull()
                },
            })
                .then(enrollments => enrollments.map(enrollment => plainToClass(EnrollmentDto, enrollment)))

        else
            throw new NotFoundException(`User not found`)
    }

    async findAllbyCourse(course_id: string): Promise<EnrollmentDto[]> {
        const course = await this.courseRepository.findOneBy({ uuid: course_id })

        if (!course._deleted_at)
            return await this.enrollmentRepository.find({
                where: {
                    course_id: course.id,
                    _deleted_at: IsNull()
                },
            })
                .then(enrollments => enrollments.map(enrollment => plainToClass(EnrollmentDto, enrollment)))
        else
            throw new NotFoundException(`Course not found`)
    }

    async findOne(student_id: string, course_id: string): Promise<EnrollmentDto> {
        const user = await this.userRepository.findOneBy({ uuid: student_id })
        const course = await this.courseRepository.findOneBy({ uuid: course_id })

        if (user && course && user._deleted_at === null && course._deleted_at === null)
            return await this.enrollmentRepository.findOne({
                where: {
                    student_id: user.id,
                    course_id: course.id,
                    _deleted_at: IsNull()
                },
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
        const user = await this.userRepository.findOneBy({ uuid: newEnrollment.student_uuid })
        const course = await this.courseRepository.findOneBy({ uuid: newEnrollment.course_uuid })

        if (!user || !course || user._deleted_at !== null || course._deleted_at !== null)
            throw new NotFoundException(`User or course not found`)

        newEnrollment["student_id"] = user.id
        newEnrollment["course_id"] = course.id

        const enrollment = await this.enrollmentRepository.save(newEnrollment)
        return plainToClass(EnrollmentDto, enrollment)
    }

    async remove(student_id: string, course_id: string): Promise<any> {
        const user = await this.userRepository.findOneBy({ uuid: student_id })
        const course = await this.courseRepository.findOneBy({ uuid: course_id })

        if (user && course && user._deleted_at === null && course._deleted_at === null)
            return await this.enrollmentRepository.findOne({
                where: {
                    student_id: user.id,
                    course_id: course.id,
                    _deleted_at: IsNull()
                }
            })
                .then(async enrollment => {
                    if (enrollment && enrollment._deleted_at === null)
                        return this.enrollmentRepository.update({ id: enrollment.id }, { _deleted_at: new Date() })
                            .then(() => "Enrollment was deleted successfully")
                    else
                        throw new NotFoundException(`Enrollment not found`)
                })
        else
            throw new NotFoundException(`User or course not found`)
    }
}
