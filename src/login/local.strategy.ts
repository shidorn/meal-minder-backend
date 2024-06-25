import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginService } from './login.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private loginService: LoginService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('local-strategy validate');
    const user = await this.loginService.validateUser(email, password);
    console.log('validate in local strategy: ', user);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
