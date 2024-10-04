import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import {
    ExtractJwt,
    Strategy
} from 'passport-jwt'
import { config } from 'dotenv'

config()

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: ACCESS_TOKEN_SECRET
        })
    }

    async validate(res: any) {
        console.log('Inside JWT Strategy Validate')
        const payload = res['payload']
        return payload
    }
}