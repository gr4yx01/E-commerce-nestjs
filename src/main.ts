import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder().setTitle('E-commerce Practise API').setDescription('This API details the endpoints for a real world E-commerce application').setVersion('1.0').build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api/docs', app, documentFactory)

  app.enableCors()  

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
