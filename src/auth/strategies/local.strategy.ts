import { PassportStrategy } from '@nestjs/passport'
import {
    ExtractJwt,
    Strategy
} from 'passport-jwt'
import {
    Injectable,
    UnauthorizedException
} from '@nestjs/common'
import { config } from 'dotenv'

import { AuthService } from '../services/auth.service'
import { LoginDto } from '../dto/auth.dto'

config()
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: ACCESS_TOKEN_SECRET,
        })
    }

    async validate(loginDto: LoginDto) {
        console.log("inside local strategy")
        const user = this.authService.signIn(loginDto)
        if (!user) throw new UnauthorizedException('Wrong email or password')
        return user
    }
}