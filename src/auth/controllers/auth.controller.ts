import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

import { AuthService } from './../services/auth.service'
import { LoginDto, SignUpDto } from './../dto/auth.dto'
import { Tokens } from 'src/utils/types'
import { RTGuard } from '../common/guards'

@ApiTags("Auth APIs")
@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    async signup(@Body() signUpDto: SignUpDto): Promise<Tokens> {
        return this.authService.signUp(signUpDto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signIn(@Body() signInDto: LoginDto): Promise<Tokens> {
        return this.authService.signIn(signInDto.email, signInDto.password)
    }

    @ApiBearerAuth('JWT')
    @UseGuards(RTGuard)
    @HttpCode(HttpStatus.OK)
    @Post('refreshtoken')
    async refreshToken(@Req() req: Request) {
        const user = req.user
        return this.authService.refreshToken(user['sub'], user['refresh_token'])
    }

    @ApiBearerAuth('JWT')
    @HttpCode(HttpStatus.OK)
    @Post('logout')
    async logout(@Req() req: Request): Promise<string> {
        const user = req.user
        return this.authService.logout(user["sub"])
    }
}
