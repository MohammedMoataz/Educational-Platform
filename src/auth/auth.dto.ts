import { ApiProperty } from "@nestjs/swagger"
import { Exclude } from "class-transformer"
import { IsBoolean, IsNotEmpty } from "class-validator"

export class LoginDto {
    @ApiProperty()
    @IsNotEmpty()
    email: string
    @ApiProperty()
    @IsNotEmpty()
    password: string
}

export class SignUpDto {
    constructor(partial: SignUpDto) { Object.assign(this, partial) }

    @Exclude()
    id: number
    @ApiProperty()
    first_name: string
    @ApiProperty()
    last_name: string
    @ApiProperty()
    email: string
    @Exclude()
    password_hash: string
    @ApiProperty({ enum: ["student", "teacher", "administrator"] })
    role: "student" | "teacher" | "administrator" | string
    @ApiProperty()
    @IsBoolean()
    disabled: boolean
}