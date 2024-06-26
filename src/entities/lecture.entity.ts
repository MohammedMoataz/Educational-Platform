import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm"

import { Course } from "./course.entity"
import { Assessment } from "./assessment.entity"
import { Attendance } from "./attendance.entity"

@Entity({ name: "lecture" })
export class Lecture {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string
    @Column()
    content: string
    @Column()
    course_id: number
    @Column({ nullable: false })
    _created_at: Date
    @Column({ nullable: true })
    _updated_at: Date
    @Column({ nullable: true })
    _deleted_at: Date

    @ManyToOne(() => Course, course => course.lectures, { cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: "course_id" })
    course: Course

    @OneToMany(() => Assessment, assessment => assessment.lecture)
    assessments: Assessment[]

    @OneToMany(() => Attendance, attendance => attendance.lecture)
    attendances: Attendance[]
}