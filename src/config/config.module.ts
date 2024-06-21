import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { MyConfigService } from './config.service';

@Module({
  imports: [NestConfigModule],
  providers: [MyConfigService],
  exports: [MyConfigService],
})
export class ConfigModule {}
