import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { User } from 'src/entities/user.entity'

import { CreateUserDto, UpdateUserDto, UserDto } from 'src/DTO/user.dto'

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async findAll(): Promise<UserDto[]> {
        const users = await this.userRepository.find({
            relations: ['courses', 'enrollments', 'attendances', 'assessmentSubmissions']
        })
            .then(users => users.filter(user => user._deleted_at === null))
            .then(users => users.map(user => plainToClass(UserDto, user)))

        if (!users)
            throw new NotFoundException(`Users not found`)

        return users
    }

    async findOneById(id: number): Promise<UserDto> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['courses', 'enrollments', 'attendances', 'assessmentSubmissions']
        })

        if (user._deleted_at === null) return plainToClass(UserDto, user)
        else throw new NotFoundException(`User with id: ${id} not found`)
    }

    async findOneByEmail(email: string): Promise<UserDto> {
        const user = await this.userRepository.findOne({
            where: { email },
            relations: ['courses', 'enrollments', 'attendances', 'assessmentSubmissions']
        })

        if (user._deleted_at === null) return plainToClass(UserDto, user)
        else throw new NotFoundException(`User with email: ${email} not found`)
    }

    async create(newUser: CreateUserDto): Promise<User> {
        return await this.userRepository.save(newUser)
    }

    async update(id: number, updatedUser: UpdateUserDto): Promise<any> {
        const user = await this.userRepository.findOneBy({ id })

        if (!user || user._deleted_at !== null)
            throw new NotFoundException(`User with id: ${id} not found`)

        return await this.userRepository.update({ id }, updatedUser)
    }

    async remove(id: number): Promise<any> {
        const user = await this.userRepository.findOneBy({ id })

        if (!user || user._deleted_at !== null)
            throw new NotFoundException(`User with id: ${id} not found`)

        return await this.userRepository.update({ id }, { _deleted_at: new Date() })
    }
}
