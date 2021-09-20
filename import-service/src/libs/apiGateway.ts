import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import { HttpHeaders } from 'aws-sdk/clients/iot';
import type { FromSchema } from 'json-schema-to-ts';

import { HttpCode } from 'src/constants';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> };
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>;

interface IResponse {
    statusCode: HttpCode;
    body: string;
    headers: HttpHeaders;
}

const DEFAULT_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
};

export const formatJSONResponse = (response: Record<string, unknown>): IResponse => {
    return {
        statusCode: HttpCode.Ok,
        body: JSON.stringify(response),
        headers: DEFAULT_HEADERS,
    };
};

export class ErrorResponse {
    public statusCode: IResponse['statusCode'];
    public body: IResponse['body'];
    public headers: IResponse['headers'];

    constructor(message = 'Something went wrong', statusCode = HttpCode.InternalServerError) {
        this.statusCode = statusCode;
        this.body = JSON.stringify({ message });
        this.headers = DEFAULT_HEADERS;
    }
}

export function logRequestData<T = void>(
    event: APIGatewayProxyEvent | ValidatedAPIGatewayProxyEvent<T>,
    lambdaModule: string,
) {
    const logInfo = {
        module: lambdaModule,
        method: event.httpMethod,
        pathParams: event.pathParameters,
        queryStringParameters: event.queryStringParameters,
        body: event.body,
    };

    console.log(JSON.stringify(logInfo));
}
