import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { LoginDto, SignUpDto } from './auth.dto'

@ApiTags("Auth APIs")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    @UsePipes(ValidationPipe)
    async signIn(@Body() signInDto: LoginDto) {
        return this.authService.signIn(signInDto.email, signInDto.password)
    }

    @Post('signup')
    @UsePipes(ValidationPipe)
    async signup(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto)
    }

    @Get('protected')
    // @UseGuards(AuthGuard)
    async protected() {
        
    }
}
