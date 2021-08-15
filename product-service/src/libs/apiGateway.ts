import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

import { HttpCode } from 'src/constants';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> };
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>;

interface IResponse {
    statusCode: HttpCode;
    body: string;
    headers: { [k: string]: string };
}

const DEFAULT_HEADERS = {
    'Access-Control-Allow-Origin': '*',
};

export const formatJSONResponse = (response: Record<string, unknown>): IResponse => {
    return {
        statusCode: HttpCode.Ok,
        body: JSON.stringify(response),
        headers: DEFAULT_HEADERS,
    };
};

export class ErrorResponse {
    public statusCode: HttpCode;
    public body: string;
    public headers: {
        [k: string]: string;
    };

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
        body: event.body,
    };

    console.log(JSON.stringify(logInfo));
}
