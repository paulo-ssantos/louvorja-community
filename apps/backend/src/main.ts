import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('LouvorJA Community API')
    .setDescription('API for LouvorJA Community platform')
    .setVersion('1.0')
    .addTag('collections')
    .addTag('tools')
    .addTag('developer')
    .addTag('auth')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
  console.log('📚 API Docs at http://localhost:3000/api/docs');
}
bootstrap();
