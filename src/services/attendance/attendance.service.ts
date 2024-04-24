import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { Attendance } from 'src/entities/attendance.entity'
import { Lecture } from 'src/entities/lecture.entity'
import { User } from 'src/entities/user.entity'
import { AttendanceDto, CreateAttendanceDto, DeleteAttendanceDto } from 'src/DTO/attendance.dto'

@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(Attendance)
        private readonly attendanceRepository: Repository<Attendance>,
        @InjectRepository(User)
        private readonly userRepository: Repository<Attendance>,
        @InjectRepository(Lecture)
        private readonly lectureRepository: Repository<Attendance>
    ) { }

    async findAllByStudent(student_id: number): Promise<AttendanceDto[]> {
        return await this.attendanceRepository.find({
            where: { student_id },
            relations: ['student', 'lecture']
        })
            .then(attendances => attendances.filter(attendance => attendance._deleted_at === null))
            .then(attendances => attendances.map(attendance => plainToClass(AttendanceDto, attendance)))
    }

    async findAllByLecture(lecture_id: number): Promise<AttendanceDto[]> {
        return await this.attendanceRepository.find({
            where: { lecture_id },
            relations: ['student', 'lecture']
        })
            .then(attendances => attendances.filter(attendance => attendance._deleted_at === null))
            .then(attendances => attendances.map(attendance => plainToClass(AttendanceDto, attendance)))

    }

    async findOne(student_id: number, lecture_id: number): Promise<AttendanceDto> {
        const attendance = await this.attendanceRepository.findOne({
            where: { student_id, lecture_id },
            relations: ['lecture', 'student']
        })

        return plainToClass(AttendanceDto, attendance)
    }

    async create(newAttendance: CreateAttendanceDto): Promise<AttendanceDto> {
        const user = await this.userRepository.findOneBy({ id: newAttendance.student_id })
        const lecture = await this.lectureRepository.findOneBy({ id: newAttendance.lecture_id })

        if (!user || !lecture || user._deleted_at !== null || lecture._deleted_at !== null)
            throw new NotFoundException(`User or lecture not found`)

        const attendance = await this.attendanceRepository.save(newAttendance)
        return plainToClass(AttendanceDto, attendance)
    }

    async remove(deletedAttendance: DeleteAttendanceDto): Promise<any> {
        const user = await this.userRepository.findOneBy({ id: deletedAttendance.student_id })
        const lecture = await this.lectureRepository.findOneBy({ id: deletedAttendance.lecture_id })
        const attendance = await this.attendanceRepository.findOne({
            where: {
                student_id: user.id,
                lecture_id: lecture.id
            }
        })


        if (!user || !lecture || user._deleted_at !== null || lecture._deleted_at !== null)
            throw new NotFoundException(`User or lecture not found`)

        return await this.attendanceRepository.update({ id: attendance.id }, { _deleted_at: new Date() })
    }
}
