import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';
import { User } from './users/entities/user.entity';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthenticationGuard } from './guards/jwt-authentication.guard';
import { AuthenticatedUser } from '@app/common';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(
    @AuthenticatedUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ): Promise<User> {
    return this.authenticationService.login(user, response);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthenticationGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}
