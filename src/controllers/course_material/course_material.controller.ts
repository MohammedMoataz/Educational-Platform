import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Query,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import {
    CreateCourseMaterialDto,
    UpdateCourseMaterialDto
} from 'src/DTO/course_material.dto'
import { CreateCourseMaterialInterceptor } from 'src/interceptors/course_material.interceptor'
import { CourseMaterialService } from 'src/services/course_material/course_material.service'
import JwtAuthGuard from 'src/auth/guards/jwt.guard'

@ApiTags("Course APIs")
@ApiBearerAuth('JWT')
@Controller('course')
export class CourseMaterialController {
    constructor(private CourseMaterialService: CourseMaterialService) { }

    @Get('materials')
    @UseGuards(JwtAuthGuard)
    getCourseMaterials(@Query('course_id') course_id: string) {
        return this.CourseMaterialService.findAll(course_id)
    }

    @Get('material')
    @UseGuards(JwtAuthGuard)
    getCourseMaterial(@Query('material_id') id: string) {
        return this.CourseMaterialService.findOneById(id)
    }

    @Post('material')
    @UsePipes(ValidationPipe)
    @UseInterceptors(CreateCourseMaterialInterceptor)
    @UseGuards(JwtAuthGuard)
    createCourseMaterial(@Body() newCourseMaterial: CreateCourseMaterialDto) {
        return this.CourseMaterialService.create(newCourseMaterial)
    }

    @Put('material')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    updateCourseMaterial(@Query('id') id: string, @Body() updatedCourseMaterial: UpdateCourseMaterialDto) {
        return this.CourseMaterialService.update(id, updatedCourseMaterial)
    }

    @Delete('material')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    removeCourseMaterial(@Query('id') id: string) {
        return this.CourseMaterialService.remove(id)
    }
}
