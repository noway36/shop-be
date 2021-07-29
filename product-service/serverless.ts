import type { AWS } from '@serverless/typescript';

import * as ProductItemSchema from '@schemas/ProductItem.json';
import * as ProductItemsArraySchema from '@schemas/ProductItemsArray.json';

import getAllProducts from '@functions/get-all-products';
import getProductById from '@functions/get-product-by-id';

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
        },
        lambdaHashingVersion: '20201221',
    },
    functions: { getAllProducts, getProductById },
};

module.exports = serverlessConfiguration;
