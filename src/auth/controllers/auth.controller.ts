import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    UnauthorizedException,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiTags
} from '@nestjs/swagger'
import { Request } from 'express'

import { AuthService } from './../services/auth.service'
import { LoginDto, SignUpDto } from './../dto/auth.dto'
import { CreateUserInterceptor } from 'src/interceptors/user.interceptor'
import { Tokens } from 'src/utils/types'
import JWTGuard from '../guards/jwt.guard'
import { AuthInterceptor } from '../interceptors/auth.interceptor'
import { UserDto } from 'src/DTO/user.dto'

@Controller()
@ApiTags("Auth APIs")
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    @UsePipes(ValidationPipe)
    @UseInterceptors(CreateUserInterceptor)
    async signup(@Body() signUpDto: SignUpDto): Promise<UserDto> {
        return this.authService.signUp(signUpDto)
    }

    @Post('signin')
    async signIn(@Body() loginDto: LoginDto): Promise<Tokens> {
        let tokens = this.authService.signIn(loginDto)

        if (!tokens) throw new UnauthorizedException('Wrong email or password')

        return tokens
    }

    @ApiBearerAuth('JWT')
    @UseGuards(JWTGuard)
    @UseInterceptors(AuthInterceptor)
    @HttpCode(HttpStatus.OK)
    @Post('refreshtoken')
    async refreshToken(@Req() req: Request, @Body() rtDto: { refresh_token: string }): Promise<Tokens> {
        const user = req.user
        return this.authService.refreshToken(user['uuid'], rtDto.refresh_token)
    }

    @ApiBearerAuth('JWT')
    @UseGuards(JWTGuard)
    @UseInterceptors(AuthInterceptor)
    @HttpCode(HttpStatus.OK)
    @Post('logout')
    async logout(@Req() req: Request): Promise<string> {
        const user = req.user
        return this.authService.logout(user["uuid"])
    }
}
