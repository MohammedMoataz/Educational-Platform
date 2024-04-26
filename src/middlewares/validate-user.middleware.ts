import { Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction } from "express"

import { hashData } from "src/utils/helper"

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {

        if (req.body["password"] && req.body["password"].length >= 8)
            req.body["password_hash"] = await hashData(req.body["password"])

        next()
    }
}