import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 8080;
  const app = await NestFactory.create(AppModule)
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Check Wishlist API')
    .setDescription('The Check Wishlist API description')
    .setVersion('1.0')
    .addTag('users')
    .addTag('gifts')
    .addTag('transactions')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}
bootstrap();