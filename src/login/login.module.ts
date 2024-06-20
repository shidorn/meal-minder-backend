import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: 'mealMinderSecretKey',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [LoginService, LocalStrategy, JwtStrategy],
  controllers: [LoginController],
})
export class LoginModule {}
