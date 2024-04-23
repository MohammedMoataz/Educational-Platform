import {
    Body,
    Controller,
    Delete,
    Get,
    ParseIntPipe,
    Post,
    Put,
    Query
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CourseMaterialDto, CreateCourseMaterialDto, UpdateCourseMaterialDto } from 'src/DTO/course_material.dto'
import { CourseMaterialService } from 'src/services/course_material/course_material.service'

@Controller('course-material')
export class CourseMaterialController {
    constructor(private CourseMaterialService: CourseMaterialService) { }

    @ApiTags("Course APIs")
    @Get('/all')
    getcourseMaterialss() {
        return this.CourseMaterialService.findAll()
    }

    @ApiTags("Course APIs")
    @Get('/:id')
    getcourseMaterials(id: number) {
        return this.CourseMaterialService.findOneById(id)
    }

    @ApiTags("Course APIs")
    @Post()
    createcourseMaterials(@Body() newCourseMaterials: CreateCourseMaterialDto) {
        return this.CourseMaterialService.create(newCourseMaterials)
    }

    @ApiTags("Course APIs")
    @Put('/:id')
    updatecourseMaterials(@Query('id', ParseIntPipe) id: number, @Body() updatedCourseMaterials: UpdateCourseMaterialDto) {
        return this.CourseMaterialService.update(id, updatedCourseMaterials)
    }

    @ApiTags("Course APIs")
    @Delete('/:id')
    removecourseMaterials(@Query('id', ParseIntPipe) id: number) {
        return this.CourseMaterialService.remove(id)
    }
}
