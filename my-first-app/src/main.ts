import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {abortOnError: false, cors: false});
  app.enableCors()
  const config = new DocumentBuilder()
    .setTitle('Ogisample')
    .setDescription('The Ogi API description')
    .setVersion('1.0')
    .addTag('ogi')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
