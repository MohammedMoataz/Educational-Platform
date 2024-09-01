import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { config } from 'dotenv'

import { AuthService } from '../services/auth.service'
import { AuthController } from '../controllers/auth.controller'
import { UserModule } from 'src/modules/user/user.module'
import { LocalStrategy } from '../strategies/local.strategy'
import { JwtStrategy } from '../strategies/jwt.strategy'

config()

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '1h' }
    }),
    UserModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [
    JwtModule,
    PassportModule,
    AuthService
  ]
})

export class AuthModule { }