import {
  Get,
  Post,
  Body,
  Controller,
  UseGuards,
  Res,
  Put,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';
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
  login(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.loginService.login(createUserDto, res);
  }

  @Post('refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.loginService.refreshToken(refreshToken);
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

  // @UseGuards(JwtAuthGuard)
  @Post('getUser')
  async getUser(@Body() email: { userEmail: string }) {
    console.log('email :', email);
    const { userEmail } = email;
    return this.loginService.getUser(userEmail);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected() {
    return { message: 'this is protected route' };
  }

  @Put('updateUser')
  updateUser(
    @Body() body: { user_id: number; username: string; photo_path: string },
  ) {
    console.log('body :', body);
    const { user_id, username, photo_path } = body;
    return this.loginService.updateUser(user_id, username, photo_path);
  }

  @Post('add-family')
  addFamily(@Body() body: { family_name: string; creator: string }) {
    const { family_name, creator } = body;
    return this.loginService.addFamily(family_name, creator);
  }

  @Get('get-families')
  getFamilies() {
    return this.loginService.getFamilies();
  }
}
