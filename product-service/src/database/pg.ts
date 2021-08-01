import { ClientConfig, Pool, PoolClient } from 'pg';

import * as Config from '../config';

const dbConfig: ClientConfig = {
    host: Config.DATABASE.HOST,
    port: Config.DATABASE.PORT,
    database: Config.DATABASE.NAME,
    user: Config.DATABASE.USER,
    password: Config.DATABASE.PASS,
    connectionTimeoutMillis: Config.DATABASE.TIMEOUT,
};

interface IDatabase {
    establishPool(): void;
    relasePool(): void;
    runQuery<T>(query: string): Promise<T[] | undefined>;
    runTransactionBasedQuery<T>(
        query: string,
        transactionOptions: { start?: boolean; end?: boolean },
    ): Promise<T[] | undefined>;
}

class Postgress implements IDatabase {
    private readonly pool: Pool;

    // Pool is used to avoid creating a new connection for each request (which is implied when using Client approach)
    private poolClient: PoolClient | null = null;

    constructor() {
        this.pool = new Pool(dbConfig);
    }

    public async establishPool() {
        try {
            this.poolClient = await this.pool.connect();
            console.log(`Connected to ${dbConfig.host}`);
        } catch (error) {
            console.log(`Failed to connect to ${dbConfig.host}: ${error}`);
            throw error;
        }
    }

    public relasePool() {
        if (this.poolClient) {
            try {
                this.poolClient.release();
                console.log('Pool Client released');
            } catch (error) {
                console.log(`Failed to release Pool Client: ${error}`);
                throw error;
            }
        } else {
            console.log('Pool Client is not connected');
        }
    }

    public async runQuery<T = void>(query: string) {
        try {
            const result = await this.pool.query<T>(query);
            return result.rows;
        } catch (error) {
            console.log(`Failed to run query: ${error}. Query: ${query}`);
            throw error;
        }
    }

    public async runTransactionBasedQuery<T = void>(
        query: string,
        transactionOptions: { start?: boolean; end?: boolean },
    ) {
        try {
            if (transactionOptions.start) {
                console.log('Begin Transaction');
                await this.pool.query('BEGIN');
            }

            const result = await this.runQuery<T>(query);

            if (transactionOptions.end) {
                console.log('End Transaction');
                await this.pool.query('COMMIT');
            }

            return result;
        } catch (error) {
            console.log(`Roll back Transaction`);
            // possibly ROLLBACK is not necessary, since if a transaction is started and was not commited,
            // it will be rolled back on connection close (release)
            await this.pool.query('ROLLBACK');
            throw error;
        }
    }
}

export const Database = new Postgress();
