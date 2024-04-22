import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UseInterceptors
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserDto } from 'src/DTO/user.dto'
import { UserInterceptor } from 'src/interceptors/user.interceptor'

import { UserService, } from 'src/services/user/user.service'
import { UserParams } from 'src/utils/type'

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
    createUser(@Body() newUser: UserParams) {
        return this.userService.create(newUser)
    }

    @ApiTags('User APIs')
    @Put(':id')
    updateUser(@Query('id', ParseIntPipe) id: number, @Body() updatedUserParams: UserParams) {
        return this.userService.update(id, updatedUserParams)
    }

    @ApiTags('User APIs')
    @Delete(':id')
    removeUser(@Query('id', ParseIntPipe) id: number) {
        return this.userService.remove(id)
    }
}
