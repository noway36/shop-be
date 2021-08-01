import { Database } from 'src/database';
import { IProduct } from 'src/products-list';

export async function getProductDataById(productId: string): Promise<IProduct> {
    try {
        const query = `
            SELECT products.id, products.title, products.description, products.price, stocks.count
                FROM products, stocks
                WHERE products.id='${productId}' AND products.id = stocks.product_id`;

        console.log(`Trying to get product with id: ${productId}`);
        await Database.establishPool();
        const products = await Database.runQuery<IProduct>(query);
        const resultProduct = products?.[0];
        console.log(`Result product: ${JSON.stringify(resultProduct)}`);

        return resultProduct;
    } catch (error) {
        throw error;
    } finally {
        Database.relasePool();
    }
}

// todo use cascade delete
export async function deleteProductDataById(productId: string): Promise<string | undefined> {
    try {
        const stocksQuery = `
                DELETE FROM stocks
                    WHERE product_id ='${productId}'
                    RETURNING id`;

        await Database.establishPool();

        const deleteStocksResult = await Database.runTransactionBasedQuery<IProduct>(stocksQuery, { start: true });
        const deletedStocksId = deleteStocksResult?.[0]?.id;

        if (deletedStocksId != null) {
            const productsQuery = `
                DELETE FROM products
                    WHERE id ='${productId}'
                    RETURNING id`;

            const deleteProductResult = await Database.runTransactionBasedQuery<IProduct>(productsQuery, {
                end: true,
            });
            const deletedProductId = deleteProductResult?.[0]?.id;

            return deletedProductId;
        }
    } catch (error) {
        throw error;
    } finally {
        Database.relasePool();
    }
}

export async function getAllProductsData(): Promise<IProduct[]> {
    try {
        const query = `
            SELECT products.id, products.title, products.description, products.price, stocks.count
                FROM products, stocks
                WHERE products.id = stocks.product_id`;

        console.log(`Trying to get all existing products from DB`);
        await Database.establishPool();
        const products = await Database.runQuery<IProduct>(query);
        console.log(`Result Products: ${JSON.stringify(products)}`);

        return products;
    } catch (error) {
        throw error;
    } finally {
        Database.relasePool();
    }
}

export async function addProductData(product: Omit<IProduct, 'id'>): Promise<IProduct | undefined> {
    try {
        const { title, description, price, count } = product;

        const insertProductQuery = `
            INSERT INTO products (title, description, price)
                VALUES
                   ('${title}', '${description}', '${price}')
                RETURNING id, title, description, price`;

        console.log(`Inserting product: ${JSON.stringify({ title, description, price, count })}`);
        await Database.establishPool();

        const insertProductResult = await Database.runTransactionBasedQuery<Omit<IProduct, 'count'>>(
            insertProductQuery,
            { start: true },
        );
        const insertedProduct = insertProductResult?.[0];

        if (insertedProduct != null) {
            const insertStockQuery = `
                INSERT INTO stocks (product_id, count)
                    VALUES
                        ('${insertedProduct.id}', '${count}')
                    RETURNING count`;

            console.log(`Inserting stock: ${JSON.stringify({ product_id: insertedProduct.id, count })}`);
            const insertStockResult = await Database.runTransactionBasedQuery<Pick<IProduct, 'count'>>(
                insertStockQuery,
                {
                    end: true,
                },
            );
            const insertedStock = insertStockResult?.[0];

            return { ...insertedProduct, ...insertedStock };
        }
    } catch (error) {
        throw error;
    } finally {
        Database.relasePool();
    }
}
