import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Attendance } from 'src/entities/attendance.entity'
import { Lecture } from 'src/entities/lecture.entity'
import { User } from 'src/entities/user.entity'
import { AttendanceDto, CreateAttendanceDto } from 'src/DTO/attendance.dto'

@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(Attendance)
        @InjectRepository(User)
        @InjectRepository(Lecture)
        private readonly attendanceRepository: Repository<Attendance>
    ) { }

    async findAll(): Promise<Attendance[]> {
        return await this.attendanceRepository.find({
            relations: ['student', 'lecture']
        })
    }

    async findOneById(id: number): Promise<Attendance> {
        return await this.attendanceRepository.findOne({
            where: { id },
            relations: ['student', 'lecture']
        })
    }

    async create(newAttendance: CreateAttendanceDto): Promise<Attendance> {
        return await this.attendanceRepository.save(newAttendance)
    }
}
