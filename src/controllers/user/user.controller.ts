import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Put,
    Query,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiOperation,
    ApiTags
} from '@nestjs/swagger'

import JWTAuthGuard from 'src/auth/guards/jwt.guard'
import {
    CreateUserDto,
    UpdateUserDto
} from 'src/DTO/user.dto'
import { CreateUserInterceptor } from 'src/interceptors/user.interceptor'
import { UserService } from 'src/services/user/user.service'

@Controller('/user')
@ApiTags('User APIs')
@ApiBearerAuth('JWT')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('all')
    @ApiOperation({ summary: 'summary goes here', description: 'description goes here' })
    @UseGuards(JWTAuthGuard)
    async getUsers() {
        return this.userService.findAll()
    }

    @Get()
    @UsePipes(ValidationPipe)
    @UseGuards(JWTAuthGuard)
    async getUser(@Query('id') id: string) {
        const user = this.userService.findOneById(id)

        if (user) return user
        else throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    @Post()
    @UsePipes(ValidationPipe)
    @UseInterceptors(CreateUserInterceptor)
    @UseGuards(JWTAuthGuard)
    async createUser(@Body() newUser: CreateUserDto) {
        return this.userService.create(newUser)
    }

    @Put()
    @UsePipes(ValidationPipe)
    @UseGuards(JWTAuthGuard)
    async updateUser(@Query('id') id: string, @Body() updatedUser: UpdateUserDto) {
        return this.userService.update(id, updatedUser)
            .then(() => "User updated successfully")
            .catch(err => err.message)
    }

    @Delete()
    @UsePipes(ValidationPipe)
    @UseGuards(JWTAuthGuard)
    async removeUser(@Query('id') id: string) {
        return this.userService.remove(id)
            .then(() => "User deleted successfully")
            .catch(err => err.message)
    }
}
