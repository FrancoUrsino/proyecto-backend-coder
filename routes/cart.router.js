import express from "express";
import CartManager from "../managers/Cart.manager.js";

const router = express.Router();
const cartManager = new CartManager();

router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    if (carts.length === 0) {
      return res.render("carrito", { products: [], cartId: null });
    }

    const cart = carts[0];
    const formattedProducts = cart.products.map(item => ({
      title: item.product.title,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image
    }));

    console.log("Productos enviados a Handlebars:", formattedProducts);

    res.render("carrito", { products: formattedProducts, cartId: cart._id });
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).send("Error al obtener el carrito");
  }
});

router.post("/product/:pid", async (req, res) => {
  try {
    const { quantity = 1 } = req.body;

    const carts = await cartManager.getCarts();
    if (carts.length === 0) {
      return res.status(404).json({ error: "No hay carritos disponibles" });
    }

    const cartId = carts[0]._id;
    console.log(`Usando carrito con ID: ${cartId}`);
    const cart = await cartManager.addProductToCart(cartId, req.params.pid, quantity);

    if (!cart) {
      return res.status(404).json({ error: "No se pudo agregar el producto" });
    }
    res.json({ message: "Producto agregado al carrito", cart });
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    res.status(500).json({ error: "Error al agregar producto al carrito" });
  }
});

router.post("/checkout", async (req, res) => {
  try {
    console.log("Datos recibidos en /checkout:", req.body);

    const { cartId } = req.body;
    if (!cartId) {
      return res.status(400).json({ error: "Falta el ID del carrito" });
    }

    const cart = await cartManager.getCartById(cartId);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }
    for (const item of cart.products) {
      const product = await cartManager.getProductById(item.product._id);
      if (product) {
        if (product.stock < item.quantity) {
          return res.status(400).json({ error: `Stock insuficiente para ${product.title}` });
        }
        product.stock -= item.quantity;
        await product.save();
      }
    }

    await cartManager.emptyCart(cartId);

    res.json({ success: true, message: "Compra realizada con éxito" });
  } catch (error) {
    console.error("Error finalizando compra:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
