import { Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction } from "express"
import { hash } from 'bcrypt'

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {

        if (req.body["password"] && req.body["password"].length >= 8)
            req.body["password_hash"] = await hash(req.body["password"], 10)

        next()
    }
}