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
import JWTAuthGuard from 'src/auth/common/guards/jwt.guard'
import {
    CreateUserDto,
    UpdateUserDto
} from 'src/DTO/user.dto'
import { UserInterceptor } from 'src/interceptors/user.interceptor'
import { UserService } from 'src/services/user/user.service'

@Controller('/user')
@ApiTags('User APIs')
@ApiBearerAuth('JWT')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('all')
    // @ApiOperation({ summary: 'summary goes here', description: 'description goes here' })
    @UseInterceptors(UserInterceptor)
    async getUsers() {
        return this.userService.findAll()
    }

    @Get()
    @UsePipes(ValidationPipe)
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JWTAuthGuard)
    async getUser(@Query('id', ParseIntPipe) id: number) {
        const user = this.userService.findOneById(id)

        if (user) return user
        else throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createUser(@Body() newUser: CreateUserDto) {
        return this.userService.create(newUser)
    }

    @Put()
    @UsePipes(ValidationPipe)
    async updateUser(@Query('id', ParseIntPipe) id: number, @Body() updatedUser: UpdateUserDto) {
        return this.userService.update(id, updatedUser)
            .then(() => "User updated successfully")
            .catch(err => err.message)
    }

    @Delete()
    @UsePipes(ValidationPipe)
    async removeUser(@Query('id', ParseIntPipe) id: number) {
        return this.userService.remove(id)
            .then(() => "User deleted successfully")
            .catch(err => err.message)
    }
}
