import {
    MiddlewareConsumer,
    Module,
    NestModule
} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'

import { ValidateUserMiddleware } from 'src/middlewares/validate-user.middleware'
import { UserController } from 'src/controllers/user/user.controller'
import { UserService } from 'src/services/user/user.service'
import { User } from 'src/entities/user.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})

export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ValidateUserMiddleware)
            .forRoutes(UserController)
    }
}
