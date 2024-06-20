import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    console.log('context');
    const result = (await super.canActivate(context)) as boolean;
    console.log(result);
    const request = context.switchToHttp().getRequest();
    console.log(request);
    await super.logIn(request);
    console.log('wee');
    return result;
  }
}
