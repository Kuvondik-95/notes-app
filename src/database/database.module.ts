import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const logger = new Logger('DatabaseModule');

        mongoose.connection.on('connected', () => {
          logger.log('MongoDB connected successfully');
        });

        mongoose.connection.on('error', (error) => {
          logger.error(`MongoDB connection error: ${error.message}`);
        });

        mongoose.connection.on('disconnected', () => {
          logger.warn('MongoDB disconnected');
        });

        return {
          uri: configService.get<string>('DB_CONNECTION'),
        };
      },
    }),
  ],
})
export class DatabaseModule {}
