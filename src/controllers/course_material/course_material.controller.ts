import {
    Body,
    Controller,
    Delete,
    Get,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CreateCourseMaterialDto, UpdateCourseMaterialDto } from 'src/DTO/course_material.dto'
import { CourseMaterialService } from 'src/services/course_material/course_material.service'

@ApiTags("Course APIs")
@Controller('course')
export class CourseMaterialController {
    constructor(private CourseMaterialService: CourseMaterialService) { }

    @Get('materials')
    getCourseMaterials(@Query('course_id', ParseIntPipe) course_id: number) {
        return this.CourseMaterialService.findAll(course_id)
    }

    @Get('material')
    getCourseMaterial(id: number) {
        return this.CourseMaterialService.findOneById(id)
    }

    @Post('material')
    @UsePipes(ValidationPipe)
    createCourseMaterial(@Body() newCourseMaterial: CreateCourseMaterialDto) {
        return this.CourseMaterialService.create(newCourseMaterial)
    }

    @Put('material')
    @UsePipes(ValidationPipe)
    updateCourseMaterial(@Query('id', ParseIntPipe) id: number, @Body() updatedCourseMaterial: UpdateCourseMaterialDto) {
        return this.CourseMaterialService.update(id, updatedCourseMaterial)
    }

    @Delete('material')
    @UsePipes(ValidationPipe)
    removeCourseMaterial(@Query('id', ParseIntPipe) id: number) {
        return this.CourseMaterialService.remove(id)
    }
}
