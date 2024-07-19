import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { Attendance } from 'src/entities/attendance.entity'
import { Lecture } from 'src/entities/lecture.entity'
import { User } from 'src/entities/user.entity'
import {
    AttendanceDto,
    CreateAttendanceDto,
} from 'src/DTO/attendance.dto'

@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(Attendance)
        private readonly attendanceRepository: Repository<Attendance>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Lecture)
        private readonly lectureRepository: Repository<Lecture>
    ) { }

    async findAllByStudent(student_id: string): Promise<AttendanceDto[]> {
        const user = await this.userRepository.findOneBy({ uuid: student_id })

        if (!user || user._deleted_at !== null)
            throw new NotFoundException(`User not found`)

        return await this.attendanceRepository.find({
            where: {
                student_id: user.id,
                _deleted_at: IsNull()
            },
        })
            .then(attendances => attendances.map(attendance => plainToClass(AttendanceDto, attendance)))
    }

    async findAllByLecture(lecture_id: string): Promise<AttendanceDto[]> {
        const lecture = await this.lectureRepository.findOneBy({ uuid: lecture_id })

        if (!lecture || lecture._deleted_at !== null)
            throw new NotFoundException(`Lecture not found`)

        return await this.attendanceRepository.find({
            where: {
                lecture_id: lecture.id,
                _deleted_at: IsNull()
            },
        })
            .then(attendances => attendances.map(attendance => plainToClass(AttendanceDto, attendance)))
    }

    async findAttendance(student_id: string, lecture_id: string): Promise<AttendanceDto> {
        const user = await this.userRepository.findOneBy({ uuid: student_id })
        const lecture = await this.lectureRepository.findOneBy({ uuid: lecture_id })

        if (!user || !lecture || user._deleted_at !== null || lecture._deleted_at !== null)
            throw new NotFoundException(`User or lecture not found`)

        const attendance = await this.attendanceRepository.findOne({
            where: {
                student_id: user.id,
                lecture_id: lecture.id,
                _deleted_at: IsNull()
            },
        })

        return plainToClass(AttendanceDto, attendance)
    }

    async create(newAttendance: CreateAttendanceDto): Promise<AttendanceDto> {
        const user = await this.userRepository.findOneBy({ uuid: newAttendance.student_uuid })
        const lecture = await this.lectureRepository.findOneBy({ uuid: newAttendance.lecture_uuid })

        if (!user || !lecture || user._deleted_at !== null || lecture._deleted_at !== null)
            throw new NotFoundException(`User or lecture not found`)


        newAttendance["student_id"] = user.id
        newAttendance["lecture_id"] = lecture.id

        const attendance = await this.attendanceRepository.save(newAttendance)
        return plainToClass(AttendanceDto, attendance)
    }

    async remove(student_id: string, lecture_id: string): Promise<any> {
        const user = await this.userRepository.findOneBy({ uuid: student_id })
        const lecture = await this.lectureRepository.findOneBy({ uuid: lecture_id })

        if (!user || !lecture || user._deleted_at !== null || lecture._deleted_at !== null)
            throw new NotFoundException(`User or lecture not found`)

        const attendance = await this.attendanceRepository.findOne({
            where: {
                student_id: user.id,
                lecture_id: lecture.id
            }
        })

        if (!attendance || attendance._deleted_at !== null)
            throw new NotFoundException(`Attendance not found`)

        return this.attendanceRepository.update({ id: attendance.id }, { _deleted_at: new Date() })
            .then(() => "Attendance was deleted successfully")
    }
}
