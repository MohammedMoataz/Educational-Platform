import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { config } from 'dotenv'
import { Request } from "express"

import { JWTPayload } from "src/utils/types"

config()

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string

@Injectable()
export class RTStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: REFRESH_TOKEN_SECRET,
            passReqestToCallback: true
        })
    }

    validate(req: Request, payload: any | JWTPayload) {
        const refreshToken = req.get('Authorization').replace('Bearer', '').trim()
        return { ...payload, refreshToken }
    }
}