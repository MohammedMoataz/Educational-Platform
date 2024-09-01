import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { config } from 'dotenv'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

config()

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string

@Injectable()
export default class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private jwtService: JwtService) {
        super()
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        console.log('Inside JWT AuthGuard canActivate')
        console.log(context.switchToHttp().getRequest().body)

        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)

        if (!token)
            throw new UnauthorizedException()

        try {
            const payload = this.jwtService.verifyAsync(
                token,
                { secret: ACCESS_TOKEN_SECRET }
            )
            console.log(payload)
        } catch {
            throw new UnauthorizedException()
        }

        return super.canActivate(context)
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}