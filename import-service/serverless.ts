import type { AWS } from '@serverless/typescript';

import importProductsFile from '@functions/importProductsFile';
import importFileParser from '@functions/importFileParser';

import { BUCKET, SQS_QUEUE_NAME } from 'src/constants';

const serverlessConfiguration: AWS = {
    service: 'import-service',
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true,
        },
    },
    plugins: ['serverless-webpack'],
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
            SQS_URL: {
                Ref: 'SQSQueue',
            },
        },
        lambdaHashingVersion: '20201221',
        iam: {
            role: {
                statements: [
                    {
                        Effect: 'Allow',
                        Action: 's3:ListBucket',
                        Resource: [`arn:aws:s3:::${BUCKET}`],
                    },
                    {
                        Effect: 'Allow',
                        Action: 's3:*',
                        Resource: [`arn:aws:s3:::${BUCKET}/*`],
                    },
                    {
                        Effect: 'Allow',
                        Action: 'sqs:*',
                        Resource: [
                            {
                                'Fn::GetAtt': ['SQSQueue', 'Arn'],
                            },
                        ],
                    },
                ],
            },
        },
    },
    resources: {
        Resources: {
            ImportServiceBucket: {
                Type: 'AWS::S3::Bucket',
                Properties: {
                    BucketName: BUCKET,
                    AccessControl: 'PublicRead',
                    CorsConfiguration: {
                        CorsRules: [
                            {
                                AllowedMethods: ['GET', 'PUT'],
                                AllowedHeaders: ['*'],
                                AllowedOrigins: ['*'],
                            },
                        ],
                    },
                },
            },
            ImportServiceBucketPolicy: {
                Type: 'AWS::S3::BucketPolicy',
                Properties: {
                    Bucket: {
                        Ref: 'ImportServiceBucket',
                    },
                    PolicyDocument: {
                        Statement: [
                            {
                                Sid: 'AllowPublicRead',
                                Effect: 'Allow',
                                Principal: { AWS: '*' },
                                Action: 's3:GetObject',
                                Resource: `arn:aws:s3:::${BUCKET}/*`,
                            },
                        ],
                    },
                },
            },
            SQSQueue: {
                Type: 'AWS::SQS::Queue',
                Properties: {
                    QueueName: SQS_QUEUE_NAME,
                },
            },
            GatewayResponseDefault4XX: {
                Type: 'AWS::ApiGateway::GatewayResponse',
                Properties: {
                    ResponseParameters: {
                        'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
                        'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
                    },
                    ResponseType: 'DEFAULT_4XX',
                    RestApiId: {
                        Ref: 'ApiGatewayRestApi',
                    },
                },
            },
        },
    },
    functions: { importProductsFile, importFileParser },
};

module.exports = serverlessConfiguration;
