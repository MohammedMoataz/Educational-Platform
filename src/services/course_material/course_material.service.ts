import {
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
    IsNull,
    Repository
} from 'typeorm'
import { plainToClass } from 'class-transformer'

import { CourseMaterial } from 'src/entities/course_material.entity'
import { Course } from 'src/entities/course.entity'
import {
    CourseMaterialDto,
    CreateCourseMaterialDto,
    UpdateCourseMaterialDto
} from 'src/DTO/course_material.dto'

@Injectable()
export class CourseMaterialService {
    constructor(
        @InjectRepository(CourseMaterial)
        private readonly courseMaterialRepository: Repository<CourseMaterial>,
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>
    ) { }

    async findAll(course_id: string): Promise<CourseMaterialDto[]> {
        const course = await this.courseRepository.findOneBy({ uuid: course_id })

        if (!course || course._deleted_at !== null)
            throw new NotFoundException(`course not found`)

        const courseMateials = await this.courseMaterialRepository.find({
            where: {
                course_id: course.id,
                _deleted_at: IsNull()
            },
        })
            .then(courseMateials => courseMateials.map(courseMateial => plainToClass(CourseMaterialDto, courseMateial)))

        if (!courseMateials)
            throw new NotFoundException(`course mateials not found`)

        return courseMateials
    }

    async findOneById(id: string): Promise<CourseMaterialDto> {
        const courseMaterial = await this.courseMaterialRepository.findOne({
            where: { uuid: id },
        })

        if (courseMaterial._deleted_at === null) return plainToClass(CourseMaterialDto, courseMaterial)
        else throw new NotFoundException(`Course material not found`)
    }

    async create(newCourseMaterial: CreateCourseMaterialDto): Promise<CourseMaterialDto> {
        const course = await this.courseRepository.findOneBy({ uuid: newCourseMaterial.course_uuid })

        if (!course || course._deleted_at !== null)
            throw new NotFoundException(`course not found`)

        newCourseMaterial["course_id"] = course.id

        const courseMaterial = await this.courseMaterialRepository.save(newCourseMaterial)
        return plainToClass(CourseMaterialDto, courseMaterial)
    }

    async update(id: string, updatedCourseMaterial: UpdateCourseMaterialDto): Promise<any> {
        const courseMaterial = await this.courseMaterialRepository.findOneBy({
            uuid: id,
            _deleted_at: IsNull()
        })
        const course = await this.courseRepository.findOneBy({
            uuid: updatedCourseMaterial.course_uuid,
            _deleted_at: IsNull()
        })

        if (!courseMaterial)
            throw new NotFoundException(`Course with id: ${id} not found`)

        if (course) {
            const result = await this.courseMaterialRepository.update({ uuid: id }, {
                title: updatedCourseMaterial.title,
                description: updatedCourseMaterial.description,
                file_url: updatedCourseMaterial.file_url,
                course_id: course.id,
                _updated_at: new Date()
            })

            if (result) return "Course material was updated successfully"
        } else {
            throw new NotFoundException(`Course not found`)
        }
    }

    async remove(id: string): Promise<any> {
        const courseMaterial = await this.courseMaterialRepository.findOneBy({ uuid: id })

        if (!courseMaterial || courseMaterial._deleted_at !== null)
            throw new NotFoundException(`This course material not found`)

        return this.courseMaterialRepository.update({ uuid: id }, { _deleted_at: new Date() })
            .then(() => "Course material was deleted successfully")
    }
}
