import express from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = express.Router();
const productManager = new ProductManager();

router.post('/add', async (req, res) => {
    try {
        const { title, price } = req.body;
        if (!title || !price) return res.status(400).json({ error: "Faltan datos" });

        await productManager.addProduct({ title, price });

        const io = req.app.get("io");
        const updatedProducts = await productManager.getProducts();
        io.emit("updateProducts", updatedProducts);

        res.status(201).json({ message: "Producto agregado con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error al agregar producto" });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await productManager.deleteProduct(parseInt(id));

        const io = req.app.get("io");
        const updatedProducts = await productManager.getProducts();
        io.emit("updateProducts", updatedProducts);

        res.status(200).json({ message: "Producto eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar producto" });
    }
});

export default router;
