import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CreateUserDto, UpdateUserDto } from 'src/DTO/user.dto'
// import { UserInterceptor } from 'src/interceptors/user.interceptor'
import { UserService, } from 'src/services/user/user.service'

@Controller('/user')
@ApiTags('User APIs')
// @ApiBearerAuth('JWT-auth')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('all')
    // @ApiOperation({ summary: 'summary goes here', description: 'description goes here' })
    // @UseInterceptors(UserInterceptor)
    getUsers() {
        return this.userService.findAll()
    }

    @Get()
    @UsePipes(ValidationPipe)
    @UseInterceptors(ClassSerializerInterceptor)
    getUser(@Query('id', ParseIntPipe) id: number) {
        const user = this.userService.findOneById(id)

        if (user) return user
        else throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() newUser: CreateUserDto) {
        return this.userService.create(newUser)
    }

    @Put()
    @UsePipes(ValidationPipe)
    updateUser(@Query('id', ParseIntPipe) id: number, @Body() updatedUser: UpdateUserDto) {
        return this.userService.update(id, updatedUser)
    }

    @Delete()
    @UsePipes(ValidationPipe)
    removeUser(@Query('id', ParseIntPipe) id: number) {
        return this.userService.remove(id)
    }
}
