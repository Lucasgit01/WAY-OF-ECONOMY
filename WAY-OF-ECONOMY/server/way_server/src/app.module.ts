import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/db.module.js';
import { HttpExceptionFilter } from './filters/globalException.js';
import { AuthModule } from './modules/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    AuthModule
  ],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: HttpExceptionFilter
    }
  ]
})
export class AppModule {}
