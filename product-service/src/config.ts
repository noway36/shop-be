import dotenv from 'dotenv';

dotenv.config();

export const DATABASE = {
    NAME: process.env.PG_DATABASE ?? 'database',
    HOST: process.env.PG_HOST ?? 'localhost',
    PORT: Number(process.env.PG_PORT) ?? 3001,
    USER: process.env.PG_USERNAME ?? '',
    PASS: process.env.PG_PASSWORD ?? '',
    TIMEOUT: Number(process.env.PG_TIMEOUT) ?? 60000,
};

export const SNS_ARN = process.env.SNS_ARN ?? '';
