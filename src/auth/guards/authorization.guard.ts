import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private userService: UsersService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()

        const user =await this.userService.getUserById(request['user'].sub)

        if(user?.role !== 'admin') {
            throw new UnauthorizedException()
        }

        return true
    }
}