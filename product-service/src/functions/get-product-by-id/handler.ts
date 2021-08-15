import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';
import { ErrorResponse, formatJSONResponse, logRequestData } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { getProductDataById } from '@libs/data-access';

import { HttpCode } from 'src/constants';

export const getProductById: APIGatewayProxyHandler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    logRequestData(event, `get-product-by-id`);

    try {
        const productId = event.pathParameters?.productId;

        if (productId != null) {
            const resultProduct = await getProductDataById(productId);

            if (resultProduct != null) {
                return formatJSONResponse({
                    product: resultProduct,
                });
            }
        }

        return new ErrorResponse(`Product with id: ${productId} not found`, HttpCode.NotFound);
    } catch (error) {
        return new ErrorResponse(`Failed To get Product: ${error}`, HttpCode.InternalServerError);
    }
};

export const main = middyfy(getProductById);
