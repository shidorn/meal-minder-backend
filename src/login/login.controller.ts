import { Post, Body, Controller, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
// import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.loginService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    return this.loginService.login(createUserDto);
  }

  @Post('check-email')
  async checkEmailExists(
    @Body('email') email: string,
  ): Promise<{ exists: boolean }> {
    const exists = await this.loginService.findByEmail(email);
    return { exists };
  }

  // @UseGuards(JwtAuthGuard)
  @Post('forgot-pass')
  async forgotPassword(
    @Body('email') email: string,
  ): Promise<{ message: string }> {
    console.log(email);
    const exists = await this.loginService.findByEmail(email);
    if (exists) {
      const resetToken = await this.loginService.generateFourDigitToken();
      console.log(resetToken);
      await this.loginService.saveFourDigitToken(email, parseInt(resetToken));

      return { message: 'Password reset instructions sent to your email' };
    } else {
      return { message: 'Email not found' };
    }
  }

  @Post('verify-token')
  async verifyToken(
    @Body() tokenData: { email: string; token: number },
  ): Promise<{ valid: boolean }> {
    const { email, token } = tokenData;

    const savedToken = await this.loginService.getFourDigitToken(email);
    console.log(savedToken);
    console.log(token);
    if (savedToken == token) {
      return { valid: true };
    } else {
      return { valid: false };
    }
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetData: { email: string; newPassword: string },
  ): Promise<{ message: string }> {
    const { email, newPassword } = resetData;
    const result = await this.loginService.resetPassword(email, newPassword);
    console.log(result);
    if (result) {
      await this.loginService.clearFourDigitToken(email);
      return { message: 'Password has been reset successfully' };
    }
    return { message: 'Invalid or expired token' };
  }
}
