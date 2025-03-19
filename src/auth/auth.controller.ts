import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/dto/login.dto';
import { LoginDocs, SignupDocs } from 'src/users/docs/user.doc';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    @SignupDocs()
    signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signup(createUserDto)
    }

    @Post('login')
    @LoginDocs()
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto.username, loginDto.password)
    }
}
