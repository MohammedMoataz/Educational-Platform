import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm"
import { Course } from "./course.entity"

@Entity({ name: "course_material" })
export class CourseMaterial {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string
    @Column()
    description: string
    @Column()
    file_url: string
    @Column()
    course_id: number
    @Column({ nullable: false })
    _created_at: Date
    @Column()
    _updated_at: Date
    @Column()
    _deleted_at: Date

    @ManyToOne(type => Course, course => course.course_materials)
    course: Course
}