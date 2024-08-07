import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm"
import { Exclude } from "class-transformer"

import { CourseMaterial } from "./course_material.entity"
import { Lecture } from "./lecture.entity"
import { User } from "./user.entity"
import { Enrollment } from "./enrollment.entity"

@Entity({ name: "course" })
export class Course {
    @PrimaryGeneratedColumn()
    @Exclude()
    id: number
    @Column()
    uuid: string
    @Column()
    name: string
    @Column()
    description: string
    @Column()
    @Exclude()
    teacher_id: number
    @Column({ nullable: false })
    _created_at: Date
    @Column({ nullable: true })
    _updated_at: Date
    @Column({ nullable: true })
    @Exclude()
    _deleted_at: Date

    @ManyToOne(() => User, user => user.courses, { cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: "teacher_id" })
    teacher: User

    @OneToMany(() => CourseMaterial, (courseMaterial) => courseMaterial.course)
    course_materials: CourseMaterial[]

    @OneToMany(() => Lecture, (lecture) => lecture.course)
    lectures: Lecture[]

    @OneToMany(() => Enrollment, enrollment => enrollment.course)
    enrollments: Enrollment[]
}