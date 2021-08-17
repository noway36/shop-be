import 'source-map-support/register';
import { S3Event } from 'aws-lambda';

import { ErrorResponse, formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { s3 } from 'src/S3Service';

const importFileParser = async (event: S3Event) => {
    console.log(`S3 Event: ${JSON.stringify(event)}`);

    try {
        await s3.processCsvFile(event);

        return formatJSONResponse({ message: 'File has been successfully uploaded' });
    } catch (error) {
        return new ErrorResponse(`Failed To Import Products File: ${error}`);
    }
};

export const main = middyfy(importFileParser);
