import {
    Controller,
    Get,
    Body,
    Bind,
    Param,
    Delete,
    Dependencies,
    CacheTTL,
    CacheKey,
    Post,
} from '@nestjs/common';

import { IProduct } from 'src/models';
import { ProductsService } from './products.service';

@Controller('products')
@Dependencies(ProductsService)
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @CacheKey('get_products')
    @CacheTTL(120)
    @Get()
    getProducts() {
        return this.productsService.getProducts();
    }

    @Post()
    @Bind(Body())
    addProduct(product: IProduct) {
        return this.productsService.addProduct(product);
    }

    @Get(':id')
    @Bind(Param('id'))
    getProductById(id: string) {
        return this.productsService.getProductById(id);
    }

    @Delete(':id')
    @Bind(Param('id'))
    deleteProductById(id: string) {
        return this.productsService.deleteProductById(id);
    }
}
