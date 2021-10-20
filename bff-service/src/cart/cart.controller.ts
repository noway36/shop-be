import { Bind, Body, Controller, Dependencies, Get, Put } from '@nestjs/common';
import { IProduct } from 'src/models';

import { CartService } from './cart.service';

@Controller('profile/cart')
@Dependencies(CartService)
export class CartController {
    constructor(private cartService: CartService) {}

    @Get()
    getCartProducts() {
        return this.cartService.getProducts();
    }

    @Put()
    @Bind(Body())
    putProductsToCart(products: IProduct[]) {
        return this.cartService.putProducts(products);
    }
}
