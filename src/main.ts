import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  // Swagger's configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Educational Platform APIs')
    .setDescription('APIs for educational platform')
    .setVersion('1.0')
    .addTag('Authentication APIs')
    .addTag('User APIs')
    .addTag('Course APIs')
    .addTag('Lecture APIs')
    .addTag('Assessment APIs')
    .addSecurity('JWT', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .setContact(
      'Mohammed Moataz',
      'https://mohammed-moataz.vercel.app/',
      'mohammed.moataz@gmail.com',
    )
    .setExternalDoc(
      'Documentations - Google Docs',
      'https://docs.google.com/document/d/13CEFJZ1wAtRQmY41F7Lz4ekvyB_DhJDnorpXrdG0Hso/edit?usp=sharing',
    )
    .build()

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api-docs', app, swaggerDocument)

  await app.listen(4000)
}
bootstrap()
