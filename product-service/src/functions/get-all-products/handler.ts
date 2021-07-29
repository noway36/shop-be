import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';
import { ErrorResponse, formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { PRODUCT_BY_ID_MAP } from 'src/products-list';
import { HttpCode } from 'src/constants';

export const getAllProducts: APIGatewayProxyHandler = async () => {
    try {
        const products = Array.from(PRODUCT_BY_ID_MAP.values());

        return formatJSONResponse({
            products,
        });
    } catch (error) {
        return new ErrorResponse(`Failed to get products list`, HttpCode.InternalServerError);
    }
};

export const main = middyfy(getAllProducts);
