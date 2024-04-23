import {
    Column,
    Entity,
    JoinColumn,
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
    @Column({nullable: true})
    _updated_at: Date
    @Column({nullable: true})
    _deleted_at: Date

    @ManyToOne(() => User, user => user.courses)
    @JoinColumn({ name: "teacher_id" })
    teacher: User

    @OneToMany(() => CourseMaterial, (courseMaterial) => courseMaterial.course)
    course_materials: CourseMaterial[]

    @OneToMany(() => Lecture, (lecture) => lecture.course)
    lectures: Lecture[]

    @OneToMany(() => Enrollment, enrollment => enrollment.course)
    enrollments: Enrollment[]
}