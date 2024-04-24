import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm"

import { Assessment } from "./assessment.entity"
import { User } from "./user.entity"

@Entity({ name: "assessment_submission" })
export class AssessmentSubmission {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    student_id: number
    @Column()
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

    @ManyToOne(() => Assessment, assessment => assessment.assessmentSubmissions)
    assessment: Assessment

    @ManyToOne(() => User, student => student.assessmentSubmissions)
    student: User
}