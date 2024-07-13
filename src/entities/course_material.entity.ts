import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm"

import { Course } from "./course.entity"
import { Exclude } from "class-transformer"

@Entity({ name: "course_material" })
export class CourseMaterial {
    @PrimaryGeneratedColumn()
    @Exclude()
    id: number
    @Column()
    title: string
    @Column()
    description: string
    @Column()
    file_url: string
    @Column()
    @Exclude()
    course_id: number
    @Column({ nullable: false })
    _created_at: Date
    @Column({ nullable: true })
    _updated_at: Date
    @Column({ nullable: true })
    _deleted_at: Date

    @ManyToOne(() => Course, course => course.course_materials, { cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: "course_id" })
    course: Course
}