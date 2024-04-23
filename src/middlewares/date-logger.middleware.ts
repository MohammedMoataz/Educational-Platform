import { Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction } from "express"

@Injectable()
export class CreateLogger implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        req.body["_created_at"] = new Date()
        next()
    }
}

@Injectable()
export class UpdateLogger implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        req.body["_updated_at"] = new Date()
        next()
    }
}
