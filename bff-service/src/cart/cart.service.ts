import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { IProduct } from 'src/models';

@Injectable()
export class CartService {
    private cartPath: string;

    constructor(
        private readonly httpService: HttpService,
        private configService: ConfigService,
    ) {
        this.cartPath = this.configService.get('cart');
    }

    getProducts() {
        return this.httpService
            .get<{ data: IProduct[] }>(`${this.cartPath}/profile/cart`)
            .pipe(
                map(({ data }) => data),
                catchError((error) => {
                    console.log(`Error occured: ${error}`);
                    return of(error);
                }),
            );
    }

    putProducts(products: IProduct[]) {
        return this.httpService
            .put<{ data: IProduct[] }>(
                `${this.cartPath}/profile/cart`,
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
}
