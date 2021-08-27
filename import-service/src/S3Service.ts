import { S3Event } from 'aws-lambda';
import * as AwsSdk from 'aws-sdk';
import csvParser from 'csv-parser';

import { BUCKET, CsvFileFolder } from './constants';

const s3Config = { signatureVersion: 'v4', region: 'eu-west-1' };

interface IS3Service {
    getSignedUrlPromise(fileName: string): Promise<string>;
    processCsvFile(event: S3Event): Promise<void>;
}

class S3Service implements IS3Service {
    private readonly s3: AwsSdk.S3;

    constructor() {
        this.s3 = new AwsSdk.S3(s3Config);
    }

    public async getSignedUrlPromise(fileName: string): Promise<string> {
        try {
            const signedUrl = await this.s3.getSignedUrlPromise('putObject', {
                Bucket: BUCKET,
                Key: `${CsvFileFolder.Uploaded}/${fileName}`,
            });

            return signedUrl;
        } catch (error) {
            console.log(`Failed to create signed url: ${error}`);
            throw error;
        }
    }

    public async processCsvFile(event: S3Event) {
        const s3ReadStream = this.createReadStream(event);

        s3ReadStream
            .pipe(csvParser())
            .on('data', data => console.log(`file chunk: ${JSON.stringify(data)}`))
            .on('end', async () => {
                await this.copyObject(event, CsvFileFolder.Uploaded, CsvFileFolder.Parsed);
                await this.deleteObject(event);
            })
            .on('error', error => {
                console.log(`Failed to Parse Csv: ${error}`);
                throw error;
            });
    }

    private async copyObject(event: S3Event, from: CsvFileFolder, to: CsvFileFolder) {
        await this.s3
            .copyObject({
                Bucket: BUCKET,
                CopySource: `${BUCKET}/${this.extractKeyFromEvent(event)}`,
                Key: this.extractKeyFromEvent(event).replace(from, to),
            })
            .promise();
    }

    private async deleteObject(event: S3Event) {
        await this.s3
            .deleteObject({
                Bucket: BUCKET,
                Key: this.extractKeyFromEvent(event),
            })
            .promise();
    }

    private createReadStream(event: S3Event) {
        return this.s3
            .getObject({
                Bucket: BUCKET,
                Key: this.extractKeyFromEvent(event),
            })
            .createReadStream();
    }

    private extractKeyFromEvent(event: S3Event): string {
        return event.Records[0].s3.object.key;
    }
}

export const s3 = new S3Service();
