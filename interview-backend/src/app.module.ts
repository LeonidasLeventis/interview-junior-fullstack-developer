import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiController } from './controllers/api.controller';
import { DataService } from './services/data.service';

@Module({
  imports: [],
  controllers: [AppController, ApiController],
  providers: [AppService, DataService],
})
export class AppModule {}
