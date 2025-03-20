import Cart from "../models/cart.model.js";
import mongoose from "mongoose";

class CartManager {
  async getCarts() {
    return await Cart.find().populate("products.product");
  }

  async getCartById(id) {
    return await Cart.findById(id).populate("products.product");
  }

  async createCart() {
    const newCart = new Cart({ products: [] });
    await newCart.save();
    return newCart;
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    try {
      console.log(`Intentando agregar producto: ${productId} al carrito: ${cartId}`);

      if (!mongoose.Types.ObjectId.isValid(cartId)) {
        console.error("ID de carrito inválido");
        return null;
      }

      const cart = await Cart.findById(cartId);

      if (!cart) {
        console.error("Carrito no encontrado");
        return null;
      }

      const productIndex = cart.products.findIndex(prod => prod.product.equals(productId));

      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();
      return cart;
    } catch (error) {
      console.error("Error en addProductToCart:", error);
      return null;
    }
  }
}

export default CartManager;
