import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [PrismaModule, LoginModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
