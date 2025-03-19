import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from "class-validator"

export class CreateUserDto {
    @ApiProperty({ example: 'hoyx0101@gmail.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({ example: 'graeyyy' })
    @IsString()
    username: string

    @ApiProperty({ example: 'Pyr@hornet0101'})
    @Length(8, 20)
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }, { message: 'password should contain at least one lowercase letter, one uppercase letter, one number, and one symbol' })
    password: string
}