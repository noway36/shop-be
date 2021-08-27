import * as AwsSdk from 'aws-sdk';

import { SNS_ARN } from 'src/config';
import { IProduct } from 'src/products-list';

interface ISNSPublisher {
    publishProduct(product: IProduct): void;
}

class SNSPublisher implements ISNSPublisher {
    private readonly sns: AwsSdk.SNS;

    constructor() {
        this.sns = new AwsSdk.SNS({ region: 'eu-west-1' });
    }

    public async publishProduct(product: IProduct) {
        await this.sns
            .publish(
                {
                    Subject: 'New Product Has Been Created',
                    Message: `product: ${JSON.stringify(product)}`,
                    TopicArn: SNS_ARN,
                    MessageAttributes: {
                        stock: {
                            DataType: 'Number',
                            StringValue: `${product.count}`,
                        },
                    },
                },
                (error, notificationData) => {
                    if (error != null) {
                        console.log(`Failed to publish product notification: ${error}. Data: ${notificationData}`);
                    } else {
                        console.log(`New message has been published to sns: ${JSON.stringify(notificationData)}`);
                    }
                },
            )
            .promise();
    }
}

export const Publisher = new SNSPublisher();
