import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm"

import { User } from "./user.entity"
import { Course } from "./course.entity"
import { Exclude } from "class-transformer"

@Entity({ name: "enrollment" })
export class Enrollment {
    @PrimaryGeneratedColumn()
    @Exclude()
    id: number
    @Column()
    @Exclude()
    student_id: number
    @Column()
    @Exclude()
    course_id: number
    @Column({ nullable: false })
    _created_at: Date
    @Column({ nullable: true })
    _deleted_at: Date

    @ManyToOne(() => User, user => user.enrollments, { cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: "student_id" })
    student: User

    @ManyToOne(() => Course, course => course.enrollments, { cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: "course_id" })
    course: Course
}