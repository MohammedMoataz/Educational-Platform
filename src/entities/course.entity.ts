import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm"
import { CourseMaterial } from "./course_material"
import { Lecture } from "./lecture.entity"
import { User } from "./user.entity"
import { Enrollment } from "./enrollment.entity"

@Entity({ name: "course" })
export class Course {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    description: string
    @Column()
    teacher_id: number
    @Column({ nullable: false })
    _created_at: Date
    @Column()
    _updated_at: Date
    @Column()
    _deleted_at: Date

    @ManyToOne(type => User, user => user.courses)
    teacher: User

    @OneToMany(type => CourseMaterial, (courseMaterial) => courseMaterial.course)
    course_materials: CourseMaterial[]

    @OneToMany(type => Lecture, (lecture) => lecture.course)
    lectures: Lecture[]

    @OneToMany(type => Enrollment, enrollment => enrollment.course)
    enrollments: Enrollment[]
}