import express from "express";
import ProductManager from "../managers/Product.manager.js";

const router = express.Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    let { limit = 3, page = 1, query, sort, category, minPrice, maxPrice, available } = req.query;

    limit = Number(limit);
    page = Number(page);
    minPrice = minPrice ? Number(minPrice) : undefined;
    maxPrice = maxPrice ? Number(maxPrice) : undefined;
    available = available === "true";

    const data = await productManager.getProducts({ limit, page, query, sort, category, minPrice, maxPrice, available });

    res.render("productos", {
      layout: "productosLayout",
      products: data.docs,
      page: data.page,
      totalPages: data.totalPages,
      hasNextPage: data.hasNextPage,
      hasPrevPage: data.hasPrevPage,
      nextPage: data.hasNextPage ? `/productos?page=${data.nextPage}&limit=${limit}` : "",
      prevPage: data.hasPrevPage ? `/productos?page=${data.prevPage}&limit=${limit}` : "",
      query,
      sort,
      category,
      minPrice,
      maxPrice,
      available
    });

  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).render("error", { message: "Error al obtener productos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productManager.getProductById(id);

    if (!product) {
      return res.status(404).render("error", { message: "Producto no encontrado" });
    }

    res.render("productoDetalle", { product });
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).render("error", { message: "Error al obtener el producto" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { title, description, price, stock, category, image } = req.body;
    if (!title || !price || !category) {
      return res.status(400).json({ status: "error", message: "Faltan datos obligatorios" });
    }

    const newProduct = await productManager.addProduct({ title, description, price, stock, category, image });
    res.status(201).json({ status: "success", message: "Producto agregado", product: newProduct });
  } catch (error) {
    console.error("Error al agregar producto:", error);
    res.status(500).json({ status: "error", message: "Error al agregar producto" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await productManager.updateProduct(id, req.body);

    if (!updatedProduct) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }
    res.json({ status: "success", message: "Producto actualizado", product: updatedProduct });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ status: "error", message: "Error al actualizar producto" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productManager.deleteProduct(id);

    if (!deletedProduct) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }
    res.json({ status: "success", message: "Producto eliminado" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ status: "error", message: "Error al eliminar producto" });
  }
});

export default router;
