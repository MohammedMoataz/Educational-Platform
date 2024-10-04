import {
    ConflictException,
    Injectable,
    UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { config } from 'dotenv'
import { plainToClass } from 'class-transformer'

import { CreateUserDto, UserDto } from 'src/DTO/user.dto'
import { UserService } from 'src/services/user/user.service'
import { compareHashedData, verifyRefreshToken } from 'src/utils/helper'
import { Tokens } from 'src/utils/types'
import { User } from 'src/entities/user.entity'
import {
    LoginDto,
    RTDto,
    SignUpDto
} from './../dto/auth.dto'

config()
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string

@Injectable()
export class AuthService {
    jwtOptions: { secret: string; verify: { algorithms: string[] } }
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {
        this.jwtOptions = {
            secret: ACCESS_TOKEN_SECRET,
            verify: { algorithms: ['HS256'] }
        }
    }

    async signIn(loginDto: LoginDto): Promise<Tokens> {
        const user = await this.userService.signIn(loginDto.email)
        if (!user || user.disabled) return null
        console.log({ user })

        const isPasswordMatchs = await compareHashedData(loginDto.password, user.password_hash)
        if (!isPasswordMatchs) return null

        const userDto = plainToClass(UserDto, user)
        userDto.refresh_token = null
        console.log({ userDto })
        const tokens = await this.getTokens(userDto)

        await this.userService.updateRefreshToken(user.uuid, tokens.refresh_token)

        return tokens
    }

    async signUp(signupDto: SignUpDto): Promise<UserDto> {
        const user = await this.userService.create(plainToClass(CreateUserDto, signupDto))

        return plainToClass(UserDto, user)
    }

    async refreshToken(id: string, refresh_token: string): Promise<any> {
        const user = await this.userService.findOneById(id)
        if (!user || user.refresh_token === null) throw new UnauthorizedException("User is not authorized")

        const userDto = plainToClass(UserDto, user)
        userDto.refresh_token = null

        const tokens = await this.getTokens(userDto)
        await this.userService.updateRefreshToken(user.uuid, tokens.refresh_token)

        return tokens
    }

    async logout(id: string): Promise<string> {
        await this.userService.updateRefreshToken(id, null)
        return "Logged out successfully"
    }

    private async getTokens(user: User | UserDto): Promise<Tokens> {
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(
                { payload: plainToClass(UserDto, user) },
                { expiresIn: '1h', secret: ACCESS_TOKEN_SECRET }),
            this.jwtService.signAsync(
                { payload: plainToClass(UserDto, user) },
                { expiresIn: '1h', secret: REFRESH_TOKEN_SECRET }),
        ])

        return { access_token, refresh_token }
    }

    async updateRefreshToken(rtDto: RTDto) {
        await this.userService.updateRefreshToken(rtDto.uuid, rtDto.refresh_token)
    }
}