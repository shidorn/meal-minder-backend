import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ConfigModule } from '@nestjs/config';
import { MyConfigService } from './config/config.service';
import { EmailService } from './login/email.service';
import { GroceriesModule } from './groceries/groceries.module';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    LoginModule,
    DashboardModule,
    GroceriesModule,
    RecipesModule,
  ],
  controllers: [AppController],
  providers: [AppService, MyConfigService, EmailService],
  exports: [EmailService],
})
export class AppModule {}
