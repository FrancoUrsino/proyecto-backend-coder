import fs from 'fs';
const path = './data/productos.json';

class ProductManager {
    constructor() {
        this.path = path;
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(prod => prod.id === id) || null;
    }

    async addProduct(product) {
        const products = await this.getProducts();
        product.id = products.length ? products[products.length - 1].id + 1 : 1;
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return product;
    }

    async updateProduct(id, updatedFields) {
        let products = await this.getProducts();
        const index = products.findIndex(prod => prod.id === id);
        if (index === -1) return null;

        products[index] = { ...products[index], ...updatedFields };
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return products[index];
    }

    async deleteProduct(id) {
        let products = await this.getProducts();
        const newProducts = products.filter(prod => prod.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 2));
        return newProducts;
    }
}

export default ProductManager;

