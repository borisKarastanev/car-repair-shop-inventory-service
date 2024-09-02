import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { AUTHENTICATION_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class JwtAuthenticationGuard implements CanActivate {
  constructor(
    @Inject(AUTHENTICATION_SERVICE)
    private readonly authenticationClient: ClientProxy,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    if (!jwt) {
      return false;
    }

    return this.authenticationClient
      .send('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
      );
  }
}
