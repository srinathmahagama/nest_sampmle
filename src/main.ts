import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.createMicroservice(AppModule, {
  //   transport: Transport.TCP,
  //   options: {
  //     host: '127.0.0.1',
  //     port: 8877,
  //   }
  // });
  //  app.listen().then(()=> console.log('MS is listening'))
  //              .catch((err) => console.log(err));
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
