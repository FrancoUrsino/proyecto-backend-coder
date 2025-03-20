import express from "express";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const cartId = req.body.cartId;
    if (!cartId) {
      return res.status(400).json({ error: "Falta el ID del carrito" });
    }

    const cart = await Cart.findById(cartId).populate("products.product");
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }
    for (const item of cart.products) {
      const product = await Product.findById(item.product._id);
      if (product) {
        product.stock -= item.quantity;
        await product.save();
      }
    }

    cart.products = [];
    await cart.save();

    res.json({ success: true, message: "Compra realizada con éxito" });
  } catch (error) {
    console.error("Error finalizando compra:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
