import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';
import { ErrorResponse, formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { PRODUCT_BY_ID_MAP } from 'src/products-list';
import { HttpCode } from 'src/constants';

export const getProductById: APIGatewayProxyHandler = async event => {
    try {
        const productId = event.pathParameters?.productId;

        if (productId != null) {
            const product = PRODUCT_BY_ID_MAP.get(productId);

            if (product != null) {
                return formatJSONResponse({
                    product,
                });
            }
        }

        return new ErrorResponse(`Product with id: ${productId} not found`, HttpCode.NotFound);
    } catch (error) {
        return new ErrorResponse(`Failed To get Product`, HttpCode.InternalServerError);
    }
};

export const main = middyfy(getProductById);
