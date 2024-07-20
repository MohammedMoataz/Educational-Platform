import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm"
import { Exclude } from "class-transformer"

import { AssessmentSubmission } from "./assessment_submission.entity"
import { Lecture } from "./lecture.entity"

@Entity({ name: "assessment" })
export class Assessment {
    @PrimaryGeneratedColumn()
    @Exclude()
    id: number
    @Column()
    uuid: string
    @Column()
    title: string
    @Column()
    description: string
    @Column()
    type: string
    @Column()
    solution: string
    @Exclude()
    @Column()
    lecture_id: number
    @Column({ nullable: false })
    _created_at: Date
    @Column({ nullable: true })
    _updated_at: Date
    @Column({ nullable: true })
    @Exclude()
    _deleted_at: Date

    @OneToMany(() => AssessmentSubmission, submission => submission.assessment)
    assessmentSubmissions: AssessmentSubmission[]

    @ManyToOne(() => Lecture, lecture => lecture.assessments, { cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: "lecture_id" })
    lecture: Lecture
}