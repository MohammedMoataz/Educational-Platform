import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { plainToClass } from 'class-transformer'
import { config } from 'dotenv'

import { CreateUserDto, UserDto } from 'src/DTO/user.dto'
import { UserService } from 'src/services/user/user.service'
import { compareHashedData, hashData } from 'src/utils/helper'
import { Tokens } from 'src/utils/types'
import { User } from 'src/entities/user.entity'
import { RTDto, SignUpDto } from './../dto/auth.dto'


config()
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, pass: string,): Promise<Tokens> {
        const user = await this.userService.signIn(email)
        if (!user) throw new UnauthorizedException("User is not authorized")
        if (user.disabled) throw new UnauthorizedException("User is disabled")

        const isPasswordMatchs = await compareHashedData(pass, user.password_hash)
        if (!isPasswordMatchs) throw new UnauthorizedException("User is not authorized")

        const tokens = await this.getTokens(user)
        await this.userService.updateRefreshToken(user.id, tokens.refresh_token)

        return tokens
    }

    async signUp(signupDto: SignUpDto): Promise<Tokens> {
        signupDto["password_hash"] = await hashData(signupDto.password)

        const user = await this.userService.create(plainToClass(CreateUserDto, signupDto))

        return await this.getTokens(user)
    }

    async refreshToken(id: number, refresh_token: string): Promise<any> {
        const user = await this.userService.findOneById(id)
        if (!user) throw new UnauthorizedException("User is not authorized")

        const isRefreshTokenMatches = await compareHashedData(refresh_token, user.refresh_token)
        if (!isRefreshTokenMatches) throw new UnauthorizedException("User is not authorized")

        const tokens = await this.getTokens(user)
        await this.userService.updateRefreshToken(user.id, tokens.refresh_token)

        return tokens
    }

    async logout(id: number): Promise<string> {
        await this.userService.updateRefreshToken(id, null)
        return "Logged out successfully"
    }

    private async getTokens(user: User | UserDto): Promise<Tokens> {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(
                { payload: plainToClass(UserDto, user) },
                { expiresIn: '1h', secret: ACCESS_TOKEN_SECRET }),
            this.jwtService.signAsync(
                { payload: plainToClass(UserDto, user) },
                { expiresIn: '1h', secret: REFRESH_TOKEN_SECRET }),
        ])

        return { access_token: at, refresh_token: rt }
    }

    async updateRefreshToken(rtDto: RTDto) {
        await this.userService.updateRefreshToken(rtDto.id, rtDto.refresh_token)
    }
}
