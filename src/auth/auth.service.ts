import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(username: string, password: string) {
        try {
            const userExist = await this.userService.getUserByUsername(username)

            if(!userExist) {
                throw new NotFoundException('User not found')
            }

            if(await this.verifyPassword(userExist, password, userExist?.password)) {
                delete (userExist as any).password

                const accessToken = this.jwtService.sign({ sub: userExist?.id, username: userExist?.username })

                return {
                    message: 'Login successful',
                    data: {
                        ...userExist,
                        accessToken
                    }
                }
            }

            return {
                message: 'Invalid username or password',
                data: null
            }
        } catch (err) {
            return err
        }
    }

    async signup(createUserDto: CreateUserDto) {
        try {
            const hashedPassword = this.hashPassword(createUserDto.password)

            const newUser: CreateUserDto = {
                ...createUserDto,
                password: hashedPassword
            }

            return await this.userService.create(newUser)
        } catch(err) {
            return err;
        }
    }

    hashPassword (password: string) {
        return bcrypt.hashSync(password, 10)
    }

    async verifyPassword(user: User, password: string, hashedPassword: string) {
        return user && (await bcrypt.compare(password, hashedPassword))
    }
}
