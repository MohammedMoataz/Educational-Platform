import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CourseMaterial } from 'src/entities/course_material'
import { Course } from 'src/entities/course.entity'
import { CourseMaterialDto } from 'src/DTO/course_material.dto'
import { CourseMaterialParams } from 'src/utils/type'

@Injectable()
export class CourseMaterialService {
    constructor(
        @InjectRepository(CourseMaterial)
        @InjectRepository(Course)
        private readonly courseMaterialRepository: Repository<CourseMaterial>
    ) { }

    async findAll(): Promise<CourseMaterial[]> {
        return await this.courseMaterialRepository.find({ relations: ['course'] })
    }

    async findOneById(id: number): Promise<CourseMaterial> {
        return await this.courseMaterialRepository.findOneBy({ id })
    }

    async create(newCourseMaterial: CourseMaterialParams): Promise<CourseMaterial> {
        return await this.courseMaterialRepository.save(newCourseMaterial)
    }

    async update(id: number, updatedCourseMaterial: CourseMaterialParams): Promise<any> {
        return await this.courseMaterialRepository.update({ id }, updatedCourseMaterial)
    }

    async remove(id: number): Promise<any> {
        return await this.courseMaterialRepository.delete({ id })
    }
}
