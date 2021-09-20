import { handlerPath } from '@libs/handlerResolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'import',
                cors: true,
                request: {
                    parameters: {
                        querystrings: {
                            name: true,
                        },
                    },
                },
                authorizer: {
                    name: 'basicAuthorizer',
                    type: 'token',
                    arn: 'arn:aws:lambda:${aws:region}:${aws:accountId}:function:authorization-service-dev-basicAuthorizer',
                    identitySource: 'method.request.header.Authorization',
                    resultTtlInSeconds: 0,
                },
            },
        },
    ],
};
