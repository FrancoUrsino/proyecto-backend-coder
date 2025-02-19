import express from 'express';
import ProductManager from '../managers/ProductManager.js';
// const ProductManager = require('../managers/ProductManager');

const router = express.Router();
const productManager = new ProductManager();

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
});

router.get('/:pid', async (req, res) => {
    const product = await productManager.getProductById(Number(req.params.pid));
    product ? res.json(product) : res.status(404).json({ error: 'Producto no encontrado' });
});

router.post("/", async (req, res) => {
    try {
        const { title, price } = req.body;

        if (!title || !price) {
            return res.status(400).json({ error: "Faltan datos obligatorios (title y price)" });
        }

        const products = await readProducts();
        const newId = products.length ? products[products.length - 1].id + 1 : 1;
        const newProduct = { id: newId, title, price };
        products.push(newProduct);
        await writeProducts(products);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: "Error al guardar el producto" });
    }
});


router.put('/:pid', async (req, res) => {
    const updatedProduct = await productManager.updateProduct(Number(req.params.pid), req.body);
    updatedProduct ? res.json(updatedProduct) : res.status(404).json({ error: 'Producto no encontrado' });
});

router.delete('/:pid', async (req, res) => {
    await productManager.deleteProduct(Number(req.params.pid));
    res.json({ message: 'Producto eliminado' });
});

export default router;


