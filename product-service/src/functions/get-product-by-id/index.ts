import { handlerPath } from '@libs/handlerResolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'products/{productId}',
                cors: true,
                request: {
                    parameters: {
                        paths: {
                            productId: true,
                        },
                    },
                },
                documentation: {
                    summary: 'get product by id',
                    description: 'get products by id',
                    pathParams: [
                        {
                            name: 'id',
                            description: 'uuid of the product',
                            schema: { type: 'string' },
                        },
                    ],
                    methodResponses: [
                        {
                            statusCode: 200,
                            responseBody: {
                                description: 'specific product',
                            },
                            responseModels: {
                                'application/json': 'ProductItem',
                            },
                        },
                        {
                            statusCode: 404,
                            responseBody: {
                                description: 'Product with such id not found',
                            },
                            responseModels: {
                                'application/json': 'object',
                            },
                        },
                    ],
                },
            },
        },
    ],
};
