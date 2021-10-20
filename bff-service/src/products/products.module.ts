import { HttpModule } from '@nestjs/axios';
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
    imports: [HttpModule, CacheModule.register()],
    controllers: [ProductsController],
    providers: [
        ProductsService,
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
})
export class ProductsModule {}
