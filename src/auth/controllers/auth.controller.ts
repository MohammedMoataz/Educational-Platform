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
import { Tokens } from 'src/utils/types'
import { RTGuard } from '../common/guards'
import { LocalGuard } from '../common/guards/local.guard'
import { CreateUserInterceptor } from 'src/interceptors/user.interceptor'

@Controller()
@ApiTags("Auth APIs")
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    @UsePipes(ValidationPipe)
    @UseInterceptors(CreateUserInterceptor)
    async signup(@Body() signUpDto: SignUpDto): Promise<Tokens> {
        return this.authService.signUp(signUpDto)
    }


    @Post('signin')
    // @UseGuards(LocalGuard)
    async signIn(@Body() loginDto: LoginDto): Promise<Tokens> {
        let tokens = this.authService.signIn(loginDto)

        if (!tokens) throw new UnauthorizedException('Wrong email or password')
        else return tokens
    }

    // @ApiBearerAuth('JWT')
    // @UseGuards(RTGuard)
    @HttpCode(HttpStatus.OK)
    @Post('refreshtoken')
    async refreshToken(@Req() req: Request) {
        const user = req.user
        return this.authService.refreshToken(user['id'], user['refresh_token'])
    }

    // @ApiBearerAuth('JWT')
    @HttpCode(HttpStatus.OK)
    @Post('logout')
    async logout(@Req() req: Request): Promise<string> {
        const user = req.user
        return this.authService.logout(user["sub"])
    }
}
