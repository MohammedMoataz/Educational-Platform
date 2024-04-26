import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserService } from 'src/services/user/user.service'
import { compareHashedData } from 'src/utils/helper'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(
        email: string,
        pass: string,
    ): Promise<{ access_token: string }> {
        const user = await this.userService.findOneByEmail(email)
        let access_token

        compareHashedData(
            pass,
            user.password_hash,
            async (err, result) => {
                if (err) throw new UnauthorizedException()

                const payload = user

                access_token = { access_token: await this.jwtService.signAsync(payload) }
            }
        )

        return access_token
    }
}
