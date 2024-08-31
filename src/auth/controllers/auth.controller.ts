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
// import { RTGuard } from '../common/guards'
import { CreateUserInterceptor } from 'src/interceptors/user.interceptor'
import { Tokens } from 'src/utils/types'
import JWTGuard from '../common/guards/jwt.guard'
import LocalGuard from '../common/guards/local.guard'

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
        console.log('sign')
        let tokens = this.authService.signIn(loginDto)

        if (!tokens) throw new UnauthorizedException('Wrong email or password')
        console.log({ tokens })

        return tokens
    }

    @ApiBearerAuth('JWT')
    @UseGuards(JWTGuard)
    @HttpCode(HttpStatus.OK)
    @Post('refreshtoken')
    async refreshToken(@Req() req: Request) {
        const user = req.user
        return this.authService.refreshToken(user['id'], user['refresh_token'])
    }

    @ApiBearerAuth('JWT')
    @UseGuards(JWTGuard)
    @HttpCode(HttpStatus.OK)
    @Post('logout')
    async logout(@Req() req: Request): Promise<string> {
        const user = req.user
        return this.authService.logout(user["id"])
    }
}
