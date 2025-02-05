const fs = require('fs');
const path = './data/carrito.json';

class CartManager {
    constructor() {
        this.path = path;
    }

    async getCarts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getCartById(id) {
        const carts = await this.getCarts();
        return carts.find(cart => cart.id === id) || null;
    }

    async createCart() {
        const carts = await this.getCarts();
        const newCart = { id: carts.length ? carts[carts.length - 1].id + 1 : 1, products: [] };
        carts.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    async addProductToCart(cartId, productId) {
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart.id === cartId);
        if (!cart) return null;

        const productIndex = cart.products.findIndex(prod => prod.product === productId);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        return cart;
    }
}

module.exports = CartManager;
