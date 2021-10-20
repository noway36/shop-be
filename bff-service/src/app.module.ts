import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CartModule } from './cart/cart.module';
import { getConfig } from './config';
import { ProductsModule } from './products/products.module';

@Module({
    imports: [
        ConfigModule.forRoot({ load: [getConfig], isGlobal: true }),
        CartModule,
        ProductsModule,
    ],
})
export class AppModule {}
