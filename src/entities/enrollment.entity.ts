import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm"
import { User } from "./user.entity"
import { Course } from "./course.entity"

@Entity({ name: "enrollment" })
export class Enrollment {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    user_id: number
    @Column()
    course_id: number
    @Column({ nullable: false })
    _created_at: Date
    @Column()
    _deleted_at: Date

    @ManyToOne(type => User, user => user.enrollments)
    student: User

    @ManyToOne(type => Course, course => course.enrollments)
    course: Course
}