import {
    Column,
    Entity,
    JoinColumn,
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
    @Column({nullable: true})
    _updated_at: Date
    @Column({nullable: true})
    _deleted_at: Date

    @ManyToOne(() => Course, course => course.course_materials)
    @JoinColumn({ name: "course_id" })
    course: Course
}