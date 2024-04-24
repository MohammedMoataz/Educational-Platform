import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { CourseMaterial } from 'src/entities/course_material.entity'
import { Course } from 'src/entities/course.entity'
import { CourseMaterialDto, CreateCourseMaterialDto, UpdateCourseMaterialDto } from 'src/DTO/course_material.dto'

@Injectable()
export class CourseMaterialService {
    constructor(
        @InjectRepository(CourseMaterial)
        private readonly courseMaterialRepository: Repository<CourseMaterial>,
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>
    ) { }

    async findAll(course_id: number): Promise<CourseMaterialDto[]> {
        const courseMateials = await this.courseMaterialRepository.find({
            where: { course_id },
            relations: ['course']
        })
            .then(courseMateials => courseMateials.filter(courseMateial => courseMateial._deleted_at === null))
            .then(courseMateials => courseMateials.map(courseMateial => plainToClass(CourseMaterialDto, courseMateial)))

        if (!courseMateials)
            throw new NotFoundException(`courseMateials not found`)

        return courseMateials
    }

    async findOneById(id: number): Promise<CourseMaterialDto> {
        const courseMaterial = await this.courseMaterialRepository.findOne({
            where: { id },
            relations: ['course']
        })

        if (courseMaterial._deleted_at === null) return plainToClass(CourseMaterialDto, courseMaterial)
        else throw new NotFoundException(`courseMaterial with id: ${id} not found`)
    }

    async create(newCourseMaterial: CreateCourseMaterialDto): Promise<CourseMaterialDto> {
        const course = await this.courseRepository.findOneBy({ id: newCourseMaterial.course_id })

        if (!course || course._deleted_at !== null)
            throw new NotFoundException(`course not found`)

        const courseMaterial = await this.courseMaterialRepository.save(newCourseMaterial)
        return plainToClass(CourseMaterialDto, courseMaterial)
    }

    async update(id: number, updatedCourseMaterial: UpdateCourseMaterialDto): Promise<any> {
        return await this.courseMaterialRepository.update({ id }, updatedCourseMaterial)
    }

    async remove(id: number): Promise<any> {
        const courseMaterial = await this.courseMaterialRepository.findOneBy({ id })

        if (!courseMaterial || courseMaterial._deleted_at !== null)
            throw new NotFoundException(`courseMaterial with id: ${id} not found`)

        return await this.courseMaterialRepository.update({ id }, { _deleted_at: new Date() })
    }
}
