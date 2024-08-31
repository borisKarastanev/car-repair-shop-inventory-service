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
import { AuthenticatedUser } from './users/authenticated-user.decorator';
import { User } from './users/entities/user.entity';
import { Response } from 'express';

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
}
