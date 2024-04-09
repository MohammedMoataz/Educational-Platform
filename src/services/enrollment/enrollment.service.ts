import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Enrollment } from 'src/entities/enrollment.entity'
import { Course } from 'src/entities/course.entity'
import { User } from 'src/entities/user.entity'
import { EnrollmentDto } from 'src/DTO/enrollment.dto'
import { EnrollmentParams, LectureParams } from 'src/utils/type'

@Injectable()
export class EnrollmentService {
    constructor(
        @InjectRepository(Enrollment)
        @InjectRepository(User)
        @InjectRepository(Course)
        private readonly enrollmentRepository: Repository<Enrollment>
    ) { }

    async findAll(): Promise<Enrollment[]> {
        return await this.enrollmentRepository.find({ relations: ['course', 'student'] })
    }

    async findOneById(id: number): Promise<Enrollment> {
        return await this.enrollmentRepository.findOneBy({ id })
    }

    async create(newEnrollment: EnrollmentParams): Promise<Enrollment> {
        return await this.enrollmentRepository.save(newEnrollment)
    }

    async update(id: number, updatedEnrollment: EnrollmentParams): Promise<any> {
        return await this.enrollmentRepository.update({ id }, updatedEnrollment)
    }

    async remove(id: number): Promise<any> {
        return await this.enrollmentRepository.delete({ id })
    }
}
