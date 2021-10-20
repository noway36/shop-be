export const getConfig = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    cart: process.env.CART || '',
    products: process.env.PRODUCTS || '',
});
