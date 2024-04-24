import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm"

import { AssessmentSubmission } from "./assessment_submission.entity"
import { Enrollment } from "./enrollment.entity"
import { Attendance } from "./attendance.entity"
import { Course } from "./course.entity"

@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    first_name: string
    @Column()
    last_name: string
    @Column({ unique: true })
    email: string
    @Column()
    password_hash: string
    @Column({ enum: ['student', 'teacher', 'administrator'] })
    role: string
    @Column()
    disabled: boolean
    @Column({ nullable: false })
    _created_at: Date
    @Column({ nullable: true })
    _updated_at: Date
    @Column({ nullable: true })
    _deleted_at: Date

    @OneToMany(() => Course, course => course.teacher)
    courses: Course[]

    @OneToMany(() => Enrollment, enrollment => enrollment.student)
    enrollments: Enrollment[]

    @OneToMany(() => Attendance, attendance => attendance.student)
    attendances: Attendance[]

    @OneToMany(() => AssessmentSubmission, assessmentSubmissions => assessmentSubmissions.student)
    assessmentSubmissions: AssessmentSubmission[]
}
