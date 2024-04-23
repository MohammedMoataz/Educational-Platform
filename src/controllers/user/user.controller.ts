import {
    Body,
    Controller,
    Delete,
    Get,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UseInterceptors
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto, UpdateUserDto } from 'src/DTO/user.dto'
import { UserInterceptor } from 'src/interceptors/user.interceptor'

import { UserService, } from 'src/services/user/user.service'

@Controller('/user')
export class UserController {
    constructor(private userService: UserService) { }

    @ApiTags('User APIs')
    @Get('all')
    @UseInterceptors(UserInterceptor)
    getUsers() {
        return this.userService.findAll()
    }

    @ApiTags('User APIs')
    @Get(':id')
    getUser(@Query('id', ParseIntPipe) id: number) {
        return this.userService.findOneById(id)
    }

    @ApiTags('User APIs')
    @Post()
    createUser(@Body() newUser: CreateUserDto) {
        return this.userService.create(newUser)
    }

    @ApiTags('User APIs')
    @Put(':id')
    updateUser(@Query('id', ParseIntPipe) id: number, @Body() updatedUser: UpdateUserDto) {
        return this.userService.update(id, updatedUser)
    }

    @ApiTags('User APIs')
    @Delete(':id')
    removeUser(@Query('id', ParseIntPipe) id: number) {
        return this.userService.remove(id)
    }
}
