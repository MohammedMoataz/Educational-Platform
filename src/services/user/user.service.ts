import {
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
    IsNull,
    Repository
} from 'typeorm'
import { plainToClass } from 'class-transformer'

import { User } from 'src/entities/user.entity'
import {
    CreateUserDto,
    UpdateUserDto,
    UserDto
} from 'src/DTO/user.dto'
import { hashData } from "src/utils/helper"

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async findAll(): Promise<UserDto[]> {
        const users = await this.userRepository.find({
            where: { _deleted_at: IsNull() },
        })
            .then(users => users.map(user => plainToClass(UserDto, user)))

        if (!users)
            throw new NotFoundException(`Users not found`)

        return users
    }

    async findOneById(id: string): Promise<UserDto> {
        const user = await this.userRepository.findOne({
            where: { uuid: id },
        })

        if (user && user._deleted_at === null) return plainToClass(UserDto, user)
        else throw new NotFoundException(`User with id: ${id} not found`)
    }

    async create(newUser: CreateUserDto): Promise<User> {
        newUser["password_hash"] = await hashData(newUser.password)

        return await this.userRepository.save(newUser)
    }

    async update(id: string, updatedUser: UpdateUserDto): Promise<any> {
        const user = await this.userRepository.findOneBy({
            uuid: id,
            _deleted_at: IsNull()
        })

        if (!user)
            throw new NotFoundException(`User with id: ${id} not found`)

        return await this.userRepository.update({ uuid: id }, updatedUser)
    }

    async updateRefreshToken(id: string, refresh_token: string): Promise<any> {
        const user = await this.userRepository.findOneBy({
            uuid: id,
            _deleted_at: IsNull()
        })

        if (!user)
            throw new NotFoundException(`User with id: ${id} not found`)

        return await this.userRepository.update({ uuid: id }, { refresh_token })
    }

    async remove(id: string): Promise<any> {
        const user = await this.userRepository.findOneBy({
            uuid: id,
            _deleted_at: IsNull()
        })

        if (!user)
            throw new NotFoundException(`User with id: ${id} not found`)

        return await this.userRepository.update({ uuid: id }, { _deleted_at: new Date() })
    }

    async signIn(email: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                email,
                _deleted_at: IsNull()
            }
        })

        if (!user) throw new NotFoundException(`User with email: ${email} not found`)
        return user
    }
}
