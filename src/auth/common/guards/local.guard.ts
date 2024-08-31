import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

@Injectable()
export default class LocalGuard extends AuthGuard('local') {
    constructor() {
        super()
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        console.log('Inside Local Guard canActivate')
        console.log(context.switchToHttp().getRequest().body)
        return super.canActivate(context)
    }
}