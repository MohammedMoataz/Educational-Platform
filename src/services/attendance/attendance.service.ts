import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Attendance } from 'src/entities/attendance.entity'
import { Lecture } from 'src/entities/lecture.entity'
import { User } from 'src/entities/user.entity'
import { AttendanceDto } from 'src/DTO/attendance.dto'
import { AttendanceParams } from 'src/utils/type'

@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(Attendance)
        @InjectRepository(User)
        @InjectRepository(Lecture)
        private readonly attendanceRepository: Repository<Attendance>
    ) { }

    async findAll(): Promise<Attendance[]> {
        return await this.attendanceRepository.find({ relations: ['student', 'lecture'] })
    }

    async findOneById(id: number): Promise<Attendance> {
        return await this.attendanceRepository.findOneBy({ id })
    }

    async create(newAttendance: AttendanceParams): Promise<Attendance> {
        return await this.attendanceRepository.save(newAttendance)
    }

    async update(id: number, updatedAttendance: AttendanceParams): Promise<any> {
        return await this.attendanceRepository.update({ id }, updatedAttendance)
    }

    async remove(id: number): Promise<any> {
        return await this.attendanceRepository.delete({ id })
    }
}
