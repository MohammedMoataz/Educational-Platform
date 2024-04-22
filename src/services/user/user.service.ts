import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from 'src/entities/user.entity'
import { Course } from 'src/entities/course.entity'
import { Enrollment } from 'src/entities/enrollment.entity'
import { Attendance } from 'src/entities/attendance.entity'
import { AssessmentSubmission } from 'src/entities/assessment_submission.entity'

import { UserDto } from 'src/DTO/user.dto'
import { UserParams } from 'src/utils/type'

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        // @InjectRepository(Course)
        // @InjectRepository(Enrollment)
        // @InjectRepository(Attendance)
        // @InjectRepository(AssessmentSubmission)
        private readonly userRepository: Repository<User>
    ) { }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find({ relations: ['courses', 'enrollments', 'attendances', 'assessmentSubmissions'] })
    }

    async findOneById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['courses', 'enrollments', 'attendances', 'assessmentSubmissions']
        })

        if (!user)
            throw new NotFoundException(`User with id: ${id} not found`)

        return user
    }

    async create(newUser: UserParams): Promise<User> {
        return await this.userRepository.save(newUser)
    }

    async update(id: number, updatedUser: UserParams): Promise<any> {
        const user = await this.userRepository.findOneBy({ id })

        if (!user)
            throw new NotFoundException(`User with id: ${id} not found`)

        return await this.userRepository.update({ id }, updatedUser)
    }

    async remove(id: number): Promise<any> {
        const user = await this.userRepository.findOneBy({ id })

        if (!user)
            throw new NotFoundException(`User with id: ${id} not found`)

        return await this.userRepository.delete({ id })
    }
}
