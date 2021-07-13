import { handlerPath } from '@libs/handlerResolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'products',
                cors: true,
                documentation: {
                    summary: 'get all available products',
                    description: 'get all available products',
                    methodResponses: [
                        {
                            statusCode: 200,
                            responseBody: {
                                description: 'all available products',
                            },
                            responseModels: {
                                'application/json': 'ProductItemsArray',
                            },
                        },
                        {
                            statusCode: 500,
                            responseBody: {
                                description: 'all available products',
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
