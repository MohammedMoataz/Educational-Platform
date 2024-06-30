// import { Module } from '@nestjs/common'
// import { JwtModule } from '@nestjs/jwt'

// import { UserModule } from 'src/modules/user/user.module'
// import { AuthController } from '../controllers/auth.controller'
// import { AuthService } from '../services/auth.service'
// import { ATStrategy } from '../strategies/at.strategy'
// import { RTStrategy } from '../strategies/rt.strategy'

// @Module({
//   imports: [
//     JwtModule.register({}),
//     UserModule,
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, ATStrategy, RTStrategy],
//   exports: [AuthService]
// })

// export class AuthModule { }

import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { config } from 'dotenv'

import { JwtStrategy } from './../strategies/jwt.strategy'

config()

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt-auth' }),
    JwtModule.register({
      secret: ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '60s' }
    })
  ],
  providers: [JwtStrategy],
  exports: [
    JwtModule,
    PassportModule
  ]
})

export class AuthModule { }