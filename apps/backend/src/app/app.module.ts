import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RequestLoggerMiddleware } from '../utils';
import { InstagramModule } from '../modules/auth/instagram/instagram.module';

@Module({
    imports: [InstagramModule],
    controllers: [AppController],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    }
}
