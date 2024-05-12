import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { plainToClass } from 'class-transformer'
import { config } from 'dotenv'

import { UserDto } from 'src/DTO/user.dto'
import { UserService } from 'src/services/user/user.service'
import { compareHashedData } from 'src/utils/helper'
import { SignUpDto } from './auth.dto'


config()
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(
        email: string,
        pass: string,
    ): Promise<{ access_token: string } | { access_token: string }> {
        const user = await this.userService.signIn(email)
        compareHashedData(
            pass,
            user.password_hash,
            async (err, result) => {
                if (err) throw new UnauthorizedException("User is not authorized")
                if (!result) throw new UnauthorizedException("User is not authorized")
            }
        )

        return {
            access_token: this.jwtService.sign(
                { payload: plainToClass(UserDto, user) },
                { expiresIn: '1h', secret: ACCESS_TOKEN_SECRET })
        }
    }

    async signUp(signupDto: SignUpDto): Promise<{ access_token: string }> {
        return { access_token: await this.jwtService.signAsync(signupDto) } // wrong
    }
}
