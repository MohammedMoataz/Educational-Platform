import {
    Column,
    Entity,
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
    user_id: number
    @Column()
    lecture_id: number
    @Column({ nullable: false })
    _created_at: Date
    @Column()
    _deleted_at: Date

    @ManyToOne(type => User, user => user.attendances)
    student: User

    @ManyToOne(type => Lecture, lecture => lecture.attendances)
    lecture: Lecture
}