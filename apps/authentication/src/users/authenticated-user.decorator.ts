import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './entities/user.entity';

const getAuthenticatedUserByContext = (context: ExecutionContext): User => {
  return context.switchToHttp().getRequest().user;
};

export const AuthenticatedUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getAuthenticatedUserByContext(context),
);
