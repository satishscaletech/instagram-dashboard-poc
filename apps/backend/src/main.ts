process.env.TZ = 'Asia/Calcutta';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
    logger,
    GlobalExceptionFilter,
    TransformInterceptor,
    ValidationPipe,
    currentEnv,
    getEnv,
    loadEnv,
} from './utils';
import { RequestMethod } from '@nestjs/common';
import { swagger } from './swagger';

const compression = require('compression');
async function bootstrap() {
    loadEnv();
    const app = await NestFactory.create(AppModule, {
        logger: logger,
        abortOnError: false,
        bufferLogs: true,
    });
    app.useLogger(logger);
    app.use(compression());
    app.enableCors();
    app.setGlobalPrefix('api/v1', {
        exclude: [
            {
                path: '/',
                method: RequestMethod.GET,
            },
        ],
    });
    swagger(app);
    app.useGlobalFilters(new GlobalExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalPipes(new ValidationPipe());

    const port = getEnv('BACKEND_PORT');
    app.listen(port, () =>
        logger.log(`Server started port=${port}, url=http://0.0.0.0:${port}, env=${currentEnv()}`),
    );
}
bootstrap();
