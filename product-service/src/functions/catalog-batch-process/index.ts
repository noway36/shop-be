import { handlerPath } from '@libs/handlerResolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            sqs: {
                batchSize: 5,
                arn: 'arn:aws:sqs:eu-west-1:089660646490:catalogItemsQueue',
            },
        },
    ],
};
