import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserController } from 'src/controllers/user/user.controller'
import { UserService } from 'src/services/user/user.service'

import { User } from 'src/entities/user.entity'
import { ValidateUserMiddleware } from 'src/middlewares/validate-user.middleware'

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService],
})

export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ValidateUserMiddleware)
            .forRoutes(UserController)
    }
}
