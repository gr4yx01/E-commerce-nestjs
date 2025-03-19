import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getUserById(id)
  }

  @Get('username/:username')
  findOneByUsername(@Param('username') username: string) {
    return this.usersService.getUserByUsername(username)
  }
}
