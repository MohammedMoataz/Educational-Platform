import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import {
    ExtractJwt,
    Strategy
} from 'passport-jwt'
import { Request } from 'express'
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

    async validate(payload: any) {
        console.log('Inside JWT Strategy Validate')
        console.log({ payload })
        return payload
    }
}