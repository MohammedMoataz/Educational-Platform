import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CourseMaterialController } from 'src/controllers/course_material/course_material.controller'
import { Course } from 'src/entities/course.entity'
import { CourseMaterial } from 'src/entities/course_material.entity'
import { CourseMaterialService } from 'src/services/course_material/course_material.service'

@Module({
    imports: [TypeOrmModule.forFeature([CourseMaterial, Course])],
    controllers: [CourseMaterialController],
    providers: [CourseMaterialService],
})

export class CourseMaterialModule { }
