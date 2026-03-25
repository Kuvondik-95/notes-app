import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? 3007);
    Logger.log(`Server is running on port ${process.env.PORT ?? 3007}`, 'Bootstrap');
  } catch (error) {
    Logger.error(`Failed to start server: ${error.message}`, error.stack, 'Bootstrap');
    process.exit(1);
  }
}
bootstrap();
