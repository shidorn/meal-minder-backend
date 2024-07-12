import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email.service';
import { Response } from 'express';

@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.created_at = new Date();
      return await this.prisma.users.create({
        data: createUserDto,
      });
    } catch (error) {
      return error.message;
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.prisma.users.findUnique({
        where: { email },
      });
      if (user && (await bcrypt.compare(password, user.password))) {
        const { password, ...result } = user;
        console.log(password);
        return result;
      }
      return false;
    } catch (error) {
      return error.message;
    }
  }

  generateRefreshToken(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return this.jwtService.sign(payload, { expiresIn: '7d' }); // Refresh token expiration time
  }

  async login(createUserDto: CreateUserDto, res: Response) {
    const payload = createUserDto;
    console.log('wee', payload);
    const token = this.jwtService.sign(payload);
    const refreshToken = this.generateRefreshToken(payload);
    const response = await this.prisma.users.findUnique({
      where: { email: payload.email },
    });

    return res.status(200).json({
      access_token: token,
      refresh_token: refreshToken,
      user: response,
    });
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken);
      const payload = { username: decoded.username, sub: decoded.sub };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (e) {
      throw new Error('Invalid refresh token');
    }
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      createUserDto.password = hashedPassword;
      const user = await this.prisma.users.create({
        data: createUserDto,
      });
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
      throw 'Email is already registered.';
    }
  }

  async findByEmail(email: string) {
    const user = await this.prisma.users.findUnique({
      where: { email },
    });
    return !!user;
  }

  async generateFourDigitToken(): Promise<string> {
    const min = 1000;
    const max = 9999;
    const token = Math.floor(Math.random() * (max - min + 1)) + min;
    return token.toString();
  }

  async saveFourDigitToken(email: string, token: number) {
    try {
      await this.emailService.sendPasswordResetEmail(email, token);
      return this.prisma.users.update({
        where: { email: email },
        data: {
          reset_pass_token: token,
          reset_pass_token_expires: new Date(Date.now() + 3600000), // 1 hr expiry
        },
      });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async getFourDigitToken(email: string): Promise<number | undefined> {
    const user = await this.prisma.users.findUnique({ where: { email } });
    return user?.reset_pass_token;
  }

  async clearFourDigitToken(email: string) {
    return this.prisma.users.update({
      where: { email: email },
      data: {
        reset_pass_token: 0,
        reset_pass_token_expires: null,
      },
    });
  }

  async resetPassword(email: string, newPassword: string): Promise<boolean> {
    try {
      const user = await this.prisma.users.findUnique({ where: { email } });
      if (user && user.reset_pass_token_expires > new Date()) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log(hashedPassword);
        await this.prisma.users.update({
          where: { email: email },
          data: {
            password: hashedPassword,
          },
        });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
  private isEmail(emailOrId: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailOrId);
  }

  async getUser(emailOrId: string) {
    console.log(emailOrId);
    try {
      if (this.isEmail(emailOrId)) {
        return await this.prisma.users.findUnique({
          where: { email: emailOrId },
        });
      } else {
        return await this.prisma.users.findUnique({
          where: { user_id: parseInt(emailOrId) },
        });
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async updateUser(id: number, username: string, photo_path: string) {
    try {
      return this.prisma.users.update({
        where: { user_id: id },
        data: { username: username, photo_path: photo_path },
      });
    } catch (error) {
      return error.message;
    }
  }

  async addFamily(family_name: string, creator: string) {
    try {
      return this.prisma.family.create({
        data: { family_name: family_name, creator: creator },
      });
    } catch (error) {
      return error.message;
    }
  }
}
