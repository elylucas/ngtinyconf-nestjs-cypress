import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TestEnvOnlyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!(process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev')) {
      return false;
    }

    if (request.headers.authorization !== 'resetcreds') {
      return false;
    }

    return true;
  }
}
