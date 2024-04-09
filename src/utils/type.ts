import { ApiProperty } from "@nestjs/swagger"
import { AssessmentDto } from "src/DTO/assessment.dto"
import { LectureDto } from "src/DTO/lecture.dto"
import { UserDto } from "src/DTO/user.dto"

export class UserParams {
    @ApiProperty()
    first_name: string
    @ApiProperty()
    last_name: string
    @ApiProperty()
    email: string
    @ApiProperty()
    password: string
    @ApiProperty({ enum: ["student", "teacher", "administrator"] })
    role: "student" | "teacher" | "administrator"
    @ApiProperty()
    _created_at: Date
}

export class CourseParams {
    @ApiProperty()
    name: string
    @ApiProperty()
    description: string
    @ApiProperty()
    teacher: UserDto
    @ApiProperty()
    _created_at: Date
}

export class LectureParams {
    @ApiProperty()
    title: string
    @ApiProperty()
    content: string
    @ApiProperty()
    _created_at: Date
}

export class EnrollmentParams {
    @ApiProperty()
    student: UserDto
    @ApiProperty()
    course: CourseParams
    @ApiProperty()
    _created_at: Date
}

export class CourseMaterialParams {
    @ApiProperty()
    title: string
    @ApiProperty()
    description: string
    @ApiProperty()
    file_url: string
    @ApiProperty()
    _created_at: Date
}

export class AttendanceParams {
    @ApiProperty()
    student: UserDto
    @ApiProperty()
    lecture: LectureDto
    @ApiProperty()
    _created_at: Date
}

export class AssessmentParams {
    @ApiProperty()
    title: string
    @ApiProperty()
    description: string
    @ApiProperty()
    due_date: Date
    @ApiProperty()
    _created_at: Date
}

export class AssessmentSubmissionParams {
    @ApiProperty()
    user: UserDto
    @ApiProperty()
    assessment: AssessmentDto
    @ApiProperty()
    submission_date: Date
    @ApiProperty()
    score: number
    @ApiProperty()
    grade: string
    @ApiProperty()
    feedback: string
    @ApiProperty()
    _created_at: Date
}