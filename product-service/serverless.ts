import type { AWS } from '@serverless/typescript';

import * as ProductItemSchema from '@schemas/ProductItem.json';
import * as ProductItemsArraySchema from '@schemas/ProductItemsArray.json';

import getAllProducts from '@functions/get-all-products';
import getProductById from '@functions/get-product-by-id';
import addProduct from '@functions/add-product';
import deleteProductById from '@functions/delete-product-by-id';
import catalogBatchProcess from '@functions/catalog-batch-process';

import * as Config from './src/config';
import { SNS_TOPIC_NAME } from 'src/constants';

const serverlessConfiguration: AWS = {
    service: 'product-service',
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true,
        },
        documentation: {
            version: '1.0.0',
            title: 'Product Service API',
            description: 'Simple API to get products',
            models: [
                {
                    name: 'ProductItem',
                    description: 'Single Product',
                    contentType: 'application/json',
                    schema: ProductItemSchema,
                },
                {
                    name: 'ProductItemsArray',
                    description: 'All Available Products',
                    contentType: 'application/json',
                    schema: ProductItemsArraySchema,
                },
            ],
        },
    },
    plugins: ['serverless-webpack', '@conqa/serverless-openapi-documentation'],
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        region: 'eu-west-1',
        apiGateway: {
            minimumCompressionSize: 1024, // enable grip if resp > 1kb
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            PG_HOST: Config.DATABASE.HOST,
            PG_PORT: String(Config.DATABASE.PORT),
            PG_DATABASE: Config.DATABASE.NAME,
            PG_USERNAME: Config.DATABASE.USER,
            PG_PASSWORD: Config.DATABASE.PASS,
            SNS_ARN: {
                Ref: 'SNSTopic',
            },
        },
        iam: {
            role: {
                statements: [
                    {
                        Effect: 'Allow',
                        Action: 'sns:*',
                        Resource: { Ref: 'SNSTopic' },
                    },
                ],
            },
        },
        lambdaHashingVersion: '20201221',
    },
    resources: {
        Resources: {
            SNSTopic: {
                Type: 'AWS::SNS::Topic',
                Properties: {
                    TopicName: SNS_TOPIC_NAME,
                },
            },
            SNSSubscriptionSmallAmountOfProducts: {
                Type: 'AWS::SNS::Subscription',
                Properties: {
                    Endpoint: 'alexander.dren36@gmail.com',
                    Protocol: 'email',
                    TopicArn: {
                        Ref: 'SNSTopic',
                    },
                    FilterPolicy: {
                        stock: [{ numeric: ['<', 10] }],
                    },
                },
            },
            SNSSubscriptionPlentyOfProducts: {
                Type: 'AWS::SNS::Subscription',
                Properties: {
                    Endpoint: 'alexander.dren36+testuser1@gmail.com',
                    Protocol: 'email',
                    TopicArn: {
                        Ref: 'SNSTopic',
                    },
                    FilterPolicy: {
                        stock: [{ numeric: ['>=', 10] }],
                    },
                },
            },
        },
    },
    functions: { getAllProducts, getProductById, addProduct, deleteProductById, catalogBatchProcess },
};

module.exports = serverlessConfiguration;
