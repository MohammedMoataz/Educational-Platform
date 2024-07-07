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

import { AuthService } from '../services/auth.service'
import { AuthController } from '../controllers/auth.controller'
import { UserModule } from 'src/modules/user/user.module'
import { LocalStrategy } from '../strategies/local.strategy'

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
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  exports: [
    JwtModule,
    PassportModule
  ]
})

export class AuthModule { }