import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation } from "@nestjs/swagger";
import { CreateUserDto } from "../dto/create-user.dto";
import { LoginDto } from "../dto/login.dto";

export function SignupDocs () {
    return applyDecorators(
        ApiOperation({ summary: 'create user' }),
        ApiBody({ type: CreateUserDto })
    )
}

export function LoginDocs () {
    return applyDecorators(
        ApiOperation({ summary: 'user login' }),
        ApiBody({ type: LoginDto })
    )
}

