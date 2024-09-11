import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtAuthenticationGuard } from '../guards/jwt-authentication.guard';
import { AuthenticatedUser } from '@app/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthenticationGuard)
  async fetchUser(@AuthenticatedUser() user: User): Promise<User> {
    return user;
  }
}
