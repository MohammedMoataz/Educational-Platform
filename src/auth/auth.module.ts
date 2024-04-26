import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { config } from 'dotenv'

import { UserModule } from 'src/modules/user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

config()

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '60s' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
