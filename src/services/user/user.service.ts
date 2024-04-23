import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from 'src/entities/user.entity'
import { Course } from 'src/entities/course.entity'
import { Enrollment } from 'src/entities/enrollment.entity'
import { Attendance } from 'src/entities/attendance.entity'
import { AssessmentSubmission } from 'src/entities/assessment_submission.entity'

import { CreateUserDto, UpdateUserDto, UserDto } from 'src/DTO/user.dto'
import { CourseDto } from 'src/DTO/course.dto'
import { AssessmentSubmissionDto } from 'src/DTO/assessment_submission.dto'
import { EnrollmentDto } from 'src/DTO/enrollment.dto'
import { AttendanceDto } from 'src/DTO/attendance.dto'

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        @InjectRepository(Course)
        @InjectRepository(Enrollment)
        @InjectRepository(Attendance)
        @InjectRepository(AssessmentSubmission)
        private readonly userRepository: Repository<User>
    ) { }

    async findAll(): Promise<UserDto[]> {
        const users = await this.userRepository.find({
            relations: ['courses', 'enrollments', 'attendances', 'assessmentSubmissions']
        })

        const userDtos = []
        users.map(user => {
            let userDto = new UserDto()
            userDto.first_name = user.first_name
            userDto.last_name = user.last_name
            userDto.email = user.email
            userDto.role = user.role
            userDto.disabled = user.disabled
            userDto.courses = []
            user.courses.map(course => {
                let courseDto = new CourseDto()
                courseDto.name = course.name
                courseDto.description = course.description
                userDto.courses.push(courseDto)
            })
            userDto.assessmentSubmissions = []
            user.assessmentSubmissions.map(assessmentSubmission => {
                let assessmentSubmissionDto = new AssessmentSubmissionDto()
                assessmentSubmissionDto.assessment.title = assessmentSubmission.assessment.title
                assessmentSubmissionDto.assessment.description = assessmentSubmission.assessment.description
                assessmentSubmissionDto.assessment.type = assessmentSubmission.assessment.type
                assessmentSubmissionDto.assessment.lecture.title = assessmentSubmission.assessment.lecture.title
                assessmentSubmissionDto.assessment.solution = assessmentSubmission.assessment.solution
                assessmentSubmissionDto.submission_date = assessmentSubmission.submission_date
                assessmentSubmissionDto.score = assessmentSubmission.score
                assessmentSubmissionDto.grade = assessmentSubmission.grade
                assessmentSubmissionDto.feedback = assessmentSubmission.feedback
                assessmentSubmissionDto._created_at = assessmentSubmission._created_at
                userDto.assessmentSubmissions.push(assessmentSubmissionDto)
            })
            userDto.enrollments = []
            user.enrollments.map(enrollment => {
                let enrollmentDto = new EnrollmentDto()
                enrollmentDto.course.name = enrollment.course.name
                enrollmentDto.course.description = enrollment.course.description
                userDto.enrollments.push(enrollmentDto)
            })
            userDto.attendances = []
            user.attendances.map(attendance => {
                let attendanceDto = new AttendanceDto()
                attendanceDto.lecture.title = attendance.lecture.title
                userDto.attendances.push(attendanceDto)
            })
            userDtos.push(userDto)
        })

        return userDtos
    }

    async findOneById(id: number): Promise<UserDto> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['courses', 'enrollments', 'attendances', 'assessmentSubmissions']
        })

        const userDto = new UserDto()
        userDto.first_name = user.first_name
        userDto.last_name = user.last_name
        userDto.email = user.email
        userDto.role = user.role
        userDto.disabled = user.disabled
        userDto.courses = []
        user.courses.map(course => {
            let courseDto = new CourseDto()
            courseDto.name = course.name
            courseDto.description = course.description
            userDto.courses.push(courseDto)
        })
        userDto.assessmentSubmissions = []
        user.assessmentSubmissions.map(assessmentSubmission => {
            let assessmentSubmissionDto = new AssessmentSubmissionDto()
            assessmentSubmissionDto.assessment.title = assessmentSubmission.assessment.title
            assessmentSubmissionDto.assessment.description = assessmentSubmission.assessment.description
            assessmentSubmissionDto.assessment.type = assessmentSubmission.assessment.type
            assessmentSubmissionDto.assessment.lecture.title = assessmentSubmission.assessment.lecture.title
            assessmentSubmissionDto.assessment.solution = assessmentSubmission.assessment.solution
            assessmentSubmissionDto.submission_date = assessmentSubmission.submission_date
            assessmentSubmissionDto.score = assessmentSubmission.score
            assessmentSubmissionDto.grade = assessmentSubmission.grade
            assessmentSubmissionDto.feedback = assessmentSubmission.feedback
            assessmentSubmissionDto._created_at = assessmentSubmission._created_at
            userDto.assessmentSubmissions.push(assessmentSubmissionDto)
        })
        userDto.enrollments = []
        user.enrollments.map(enrollment => {
            let enrollmentDto = new EnrollmentDto()
            enrollmentDto.course.name = enrollment.course.name
            enrollmentDto.course.description = enrollment.course.description
            userDto.enrollments.push(enrollmentDto)
        })
        userDto.attendances = []
        user.attendances.map(attendance => {
            let attendanceDto = new AttendanceDto()
            attendanceDto.lecture.title = attendance.lecture.title
            userDto.attendances.push(attendanceDto)
        })

        if (!user)
            throw new NotFoundException(`User with id: ${id} not found`)

        return userDto
    }

    async create(newUser: CreateUserDto): Promise<User> {
        newUser["password_hash"] = newUser.password
        return await this.userRepository.save(newUser)
    }

    async update(id: number, updatedUser: UpdateUserDto): Promise<any> {
        const user = await this.userRepository.findOneBy({ id })

        if (!user)
            throw new NotFoundException(`User with id: ${id} not found`)

        updatedUser["password_hash"] = updatedUser.password
        return await this.userRepository.update({ id }, updatedUser)
    }

    async remove(id: number): Promise<any> {
        const user = await this.userRepository.findOneBy({ id })

        if (!user)
            throw new NotFoundException(`User with id: ${id} not found`)

        return await this.userRepository.delete({ id })
    }
}
