import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NextFunction, Response, Request } from 'express';

import { AppModule } from './app.module';

const SUPPORTED_SERVICES_SET = new Set(['cart', 'products']);

const validatePath =
    (configService: ConfigService) =>
    (req: Request, res: Response, next: NextFunction) => {
        const isSupported = req.originalUrl
            .split('/')
            .some(
                (path) =>
                    SUPPORTED_SERVICES_SET.has(path) &&
                    configService.get(path) != null,
            );

        if (!isSupported) {
            return res.status(502).send('Cannot process request');
        }
        next();
    };

async function bootstrap(): Promise<string> {
    const app = await NestFactory.create(AppModule, { cors: true });
    const configService = app.get(ConfigService);
    const port = configService.get('port');
    app.use(validatePath(configService));
    await app.listen(port);

    return port;
}
bootstrap().then((port) => {
    console.log('App is running on %s port', port);
});
