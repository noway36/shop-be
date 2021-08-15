import 'source-map-support/register';

import { ErrorResponse, formatJSONResponse, logRequestData } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { deleteProductDataById } from '@libs/data-access';

import { HttpCode } from 'src/constants';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const deleteProductById: APIGatewayProxyHandler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    logRequestData(event, 'add-product');

    try {
        const productId = event.pathParameters?.productId;

        if (productId != null) {
            const deletedProductId: string | undefined = await deleteProductDataById(productId);

            if (deletedProductId != null) {
                return formatJSONResponse({
                    deletedId: deletedProductId,
                });
            }
        }

        return new ErrorResponse(`Failed to delete product with id: ${productId}`, HttpCode.InternalServerError);
    } catch (error) {
        return new ErrorResponse(`Failed to delete product: ${error}`, HttpCode.InternalServerError);
    }
};

export const main = middyfy(deleteProductById);
