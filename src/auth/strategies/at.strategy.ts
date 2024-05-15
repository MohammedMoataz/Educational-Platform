import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { config } from 'dotenv'
import { JWTPayload } from "src/utils/types"

config()

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string

@Injectable()
export class ATStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: ACCESS_TOKEN_SECRET
        })
    }

    validate(payload: any | JWTPayload) {
        return payload
    }
}