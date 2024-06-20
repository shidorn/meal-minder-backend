import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      console.log('wee');
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
        console.log(result);
        return user;
      }
      return null;
    } catch (error) {
      return error.message;
    }
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.user_id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    const user = await this.prisma.users.create({
      data: createUserDto,
    });
    return user;
  }
}
