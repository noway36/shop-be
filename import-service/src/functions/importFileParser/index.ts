import { handlerPath } from '@libs/handlerResolver';

import { BUCKET, CsvFileFolder } from 'src/constants';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            s3: {
                bucket: BUCKET,
                existing: true,
                rules: [{ prefix: `${CsvFileFolder.Uploaded}/`, suffix: '.csv' }],
                event: 's3:ObjectCreated:*',
            },
        },
    ],
};
