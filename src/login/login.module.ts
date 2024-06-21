import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { MyConfigService } from 'src/config/config.service';
import { ConfigModule } from '../config/config.module';
import { EmailService } from './email.service';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: MyConfigService) => ({
        secret: configService.jwtSecret,
        signOptions: { expiresIn: configService.jwtExpiration },
      }),
      inject: [MyConfigService],
    }),
  ],
  providers: [
    LoginService,
    LocalStrategy,
    JwtStrategy,
    MyConfigService,
    EmailService,
  ],
  controllers: [LoginController],
})
export class LoginModule {}
