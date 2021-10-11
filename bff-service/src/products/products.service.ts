import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IProduct } from 'src/models';

@Injectable()
export class ProductsService {
    private productsPath: string;

    constructor(
        private readonly httpService: HttpService,
        private configService: ConfigService,
    ) {
        this.productsPath = this.configService.get('products');
    }

    getProducts() {
        return this.httpService
            .get<{ data: { products: IProduct[] } }>(
                `${this.productsPath}/products`,
            )
            .pipe(
                map(({ data }) => data),
                catchError((error) => {
                    console.log(`Error occured: ${error}`);
                    return of(error);
                }),
            );
    }

    addProduct(products: IProduct) {
        return this.httpService
            .post<{ data: { product: IProduct[] } }>(
                `${this.productsPath}/products`,
                products,
            )
            .pipe(
                map(({ data }) => data),
                catchError((error) => {
                    console.log(`Error occured: ${error}`);
                    return of(error);
                }),
            );
    }

    getProductById(id: string) {
        return this.httpService
            .get<{ data: { product: IProduct[] } }>(
                `${this.productsPath}/products/${id}`,
            )
            .pipe(
                map(({ data }) => data),
                catchError((error) => {
                    console.log(`Error occured: ${error}`);
                    return of(error);
                }),
            );
    }

    deleteProductById(id: string) {
        return this.httpService
            .delete<{ data: { deletedId: string } }>(
                `${this.productsPath}/products/${id}`,
            )
            .pipe(
                map(({ data }) => data),
                catchError((error) => {
                    console.log(`Error occured: ${error}`);
                    return of(error);
                }),
            );
    }
}
