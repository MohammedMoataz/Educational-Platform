import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm"
import { AssessmentSubmission } from "./assessment_submission.entity"
import { Lecture } from "./lecture.entity"

@Entity({ name: "assessment" })
export class Assessment {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string
    @Column()
    description: string
    @Column()
    type: string
    @Column()
    solution: string
    @Column()
    lecture_id: number
    @Column({ nullable: false })
    _created_at: Date
    @Column()
    _updated_at: Date
    @Column()
    _deleted_at: Date

    @OneToMany(type => AssessmentSubmission, submission => submission.assessment)
    assessmentSubmissions: AssessmentSubmission[]
    
    @ManyToOne(type => Lecture, lecture => lecture.assessments)
    lecture: Lecture
}