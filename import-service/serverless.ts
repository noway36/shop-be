import type { AWS } from '@serverless/typescript';

import importProductsFile from '@functions/importProductsFile';
import importFileParser from '@functions/importFileParser';

import { BUCKET } from 'src/constants';

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
                ],
            },
        },
    },
    // resources: {
    //     Resources: {
    //         importServiceBucket: {
    //             Type: 'AWS::S3::Bucket',
    //             Properties: {
    //                 BucketName: BUCKET,
    //                 CorsConfiguration: {
    //                     CorsRules: [
    //                         {
    //                             AllowedMethods: ['GET', 'PUT'],
    //                             AllowedHeaders: ['*'],
    //                             AllowedOrigins: ['*'],
    //                         },
    //                     ],
    //                 },
    //             },
    //         },
    //     },
    //     Outputs: {
    //         importServiceBucketOutput: {
    //             Value: {
    //                 Ref: 'importServiceBucket',
    //             },
    //         },
    //     },
    // },
    functions: { importProductsFile, importFileParser },
};

module.exports = serverlessConfiguration;
