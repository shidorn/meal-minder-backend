import { Post, Body, Controller, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.loginService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const email = createUserDto.email;
    const password = createUserDto.password;
    return this.loginService.validateUser(email, password);
  }
}
