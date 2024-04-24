import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm"

import { User } from "./user.entity"
import { Lecture } from "./lecture.entity"

@Entity({ name: "attendance" })
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    student_id: number
    @Column()
    lecture_id: number
    @Column({ nullable: false })
    _created_at: Date
    @Column({ nullable: true })
    _deleted_at: Date

    @ManyToOne(() => User, user => user.attendances, { cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: "student_id" })
    student: User

    @ManyToOne(() => Lecture, lecture => lecture.attendances, { cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: "lecture_id" })
    lecture: Lecture
}