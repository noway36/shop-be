import dotenv from 'dotenv';

dotenv.config();

export const SQS_URL = process.env.SQS_URL ?? '';
