import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    return await this.usersRepository.createUser(createUserDto);
  }

  async verifyUser(email: string, password: string): Promise<User> {
    return await this.usersRepository.validateUser(email, password);
  }

  async fetchUser(getUserDto: GetUserDto): Promise<User> {
    return await this.usersRepository.findOne(getUserDto);
  }
}
