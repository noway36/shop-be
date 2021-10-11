import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
    imports: [HttpModule],
    controllers: [CartController],
    providers: [CartService],
})
export class CartModule {}
