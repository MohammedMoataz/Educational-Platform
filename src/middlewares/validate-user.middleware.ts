import {
    Injectable,
    NestMiddleware
} from "@nestjs/common"
import { NextFunction } from "express"

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {

        next()
    }
}