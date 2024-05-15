import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { UserModule } from 'src/modules/user/user.module'
import { AuthController } from '../controllers/auth.controller'
import { AuthService } from '../services/auth.service'
import { ATStrategy } from '../strategies/at.strategy'
import { RTStrategy } from '../strategies/rt.strategy'

@Module({
  imports: [
    JwtModule.register({}),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ATStrategy, RTStrategy],
  exports: [AuthService]
})

export class AuthModule { }
