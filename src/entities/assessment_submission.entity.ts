import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm"

import { Assessment } from "./assessment.entity"
import { User } from "./user.entity"
import { Exclude } from "class-transformer"

@Entity({ name: "assessment_submission" })
export class AssessmentSubmission {
    @PrimaryGeneratedColumn()
    @Exclude()
    id: number
    @Column()
    @Exclude()
    student_id: number
    @Column()
    @Exclude()
    assessment_id: number
    @Column()
    submission_date: Date
    @Column()
    score: number
    @Column()
    grade: string
    @Column({ nullable: true })
    feedback: string
    @Column({ nullable: false })
    _created_at: Date

    @ManyToOne(() => Assessment, assessment => assessment.assessmentSubmissions, { cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: "assessment_id" })
    assessment: Assessment

    @ManyToOne(() => User, student => student.assessmentSubmissions, { cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: "student_id" })
    student: User
}