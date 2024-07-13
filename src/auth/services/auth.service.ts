import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PassportStrategy } from '@nestjs/passport'
import {
    ExtractJwt,
    Strategy
} from 'passport-jwt'
import { plainToClass, plainToClassFromExist } from 'class-transformer'
import { config } from 'dotenv'

import { CreateUserDto, UserDto } from 'src/DTO/user.dto'
import { UserService } from 'src/services/user/user.service'
import {
    compareHashedData,
    hashData
} from 'src/utils/helper'
import { Tokens } from 'src/utils/types'
import { User } from 'src/entities/user.entity'
import {
    LoginDto,
    RTDto,
    SignUpDto
} from './../dto/auth.dto'


config()
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string

@Injectable()
export class AuthService {
    jwtOptions: { secret: string; verify: { algorithms: string[] } }
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {
        this.jwtOptions = {
            secret: ACCESS_TOKEN_SECRET,
            verify: { algorithms: ['HS256'] }
        }
    }

    async signIn(loginDto: LoginDto): Promise<Tokens> {
        const user = await this.userService.signIn(loginDto.email)

        if (!user) return null
        if (user.disabled) return null

        // const isPasswordMatchs = await compareHashedData(loginDto.password, user.password_hash)
        // if (!isPasswordMatchs) return null

        const tokens = await this.getTokens(user)
        // await this.userService.updateRefreshToken(user.id, tokens.refresh_token)

        console.log({ tokens })
        return tokens
    }

    async signUp(signupDto: SignUpDto): Promise<Tokens> {
        signupDto["password_hash"] = await hashData(signupDto.password)

        const user = await this.userService.create(plainToClass(CreateUserDto, signupDto))

        return await this.getTokens(user)
    }

    async refreshToken(id: string, refresh_token: string): Promise<any> {
        const user = await this.userService.findOneById(id)
        if (!user) throw new UnauthorizedException("User is not authorized")

        const isRefreshTokenMatches = await compareHashedData(refresh_token, user.refresh_token)
        if (!isRefreshTokenMatches) throw new UnauthorizedException("User is not authorized")

        const tokens = await this.getTokens(user)
        await this.userService.updateRefreshToken(user.uuid, tokens.refresh_token)

        return tokens
    }

    async logout(id: string): Promise<string> {
        await this.userService.updateRefreshToken(id, null)
        return "Logged out successfully"
    }

    private async getTokens(user: User | UserDto): Promise<Tokens> {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(
                { payload: plainToClass(UserDto, user) },
                { expiresIn: '1h', secret: ACCESS_TOKEN_SECRET }),
            this.jwtService.signAsync(
                { payload: plainToClass(UserDto, user) },
                { expiresIn: '1h', secret: REFRESH_TOKEN_SECRET }),
        ])

        return { access_token: at, refresh_token: rt }
    }

    async updateRefreshToken(rtDto: RTDto) {
        await this.userService.updateRefreshToken(rtDto.uuid, rtDto.refresh_token)
    }

    login(user: { username: any; userId: any }) {
        const payload = { username: user.username, sub: user.userId }

        return { access_token: this.jwtService.sign(payload, this.jwtOptions) }
    }

    validate(payload: { sub: any; username: any }) {
        return { userId: payload.sub, username: payload.username }
    }
}

// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthService } from './auth.service';
// import { JwtService } from '@nestjs/jwt';
// import { UserService } from '../user/user.service';

// describe('AuthService', () => {
//   let service: AuthService;
//   let userService: UserService;
//   let jwtService: JwtService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         AuthService,
//         {
//           provide: UserService,
//           useValue: {
//             findOne: jest.fn(),
//           },
//         },
//         {
//           provide: JwtService,
//           useValue: {
//             sign: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     service = module.get<AuthService>(AuthService);
//     userService = module.get<UserService>(UserService);
//     jwtService = module.get<JwtService>(JwtService);
//   });

//   it('should return an access token', async () => {
//     const user = { username: 'test', userId: 1 };
//     const findOneSpy = jest.spyOn(userService, 'findOne').mockResolvedValue(user);
//     const signSpy = jest.spyOn(jwtService, 'sign').mockReturnValue('access_token');

//     const result = await service.login(user);

//     expect(findOneSpy).toHaveBeenCalledWith(user.userId);
//     expect(signSpy).toHaveBeenCalledWith({ username: user.username, sub: user.userId }, expect.any(Object));
//     expect(result).toEqual({ access_token: 'access_token' });
//   });

//   it('should throw an error if user is not found', async () => {
//     const userId = 1;
//     const findOneSpy = jest.spyOn(userService, 'findOne').mockResolvedValue(null);

//     await expect(service.login({ username: 'test', userId })).rejects.toThrowError(`User with id ${ userId } not found`);
//     expect(findOneSpy).toHaveBeenCalledWith(userId);
//   });
// });