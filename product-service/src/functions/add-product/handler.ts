import 'source-map-support/register';

import {
    ErrorResponse,
    formatJSONResponse,
    logRequestData,
    ValidatedEventAPIGatewayProxyEvent,
} from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { addProductData } from '@libs/data-access';

import { HttpCode } from 'src/constants';
import { IProduct } from 'src/products-list';
import schema from './schema';

export const addProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    logRequestData(event, 'add-product');

    try {
        const product: Omit<IProduct, 'id'> = event.body?.product;
        if (product != null) {
            const insertedProduct: IProduct | undefined = await addProductData(product);

            if (insertedProduct != null) {
                return formatJSONResponse({
                    product: insertedProduct,
                });
            }
        }

        return new ErrorResponse(`Failed to insert product: ${product}`, HttpCode.InternalServerError);
    } catch (error) {
        return new ErrorResponse(`Failed to insert product: ${error}`, HttpCode.InternalServerError);
    }
};

export const main = middyfy(addProduct);
