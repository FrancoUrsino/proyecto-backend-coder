import express from 'express';
const router = express.Router();

// Datos de ejemplo
let products = [
    { id: 1, name: 'Producto 1', price: 100 },
    { id: 2, name: 'Producto 2', price: 200 },
];

// Ruta para la vista home
router.get('/', (req, res) => {
    res.render('home', { products });
});

// Ruta para la vista en tiempo real
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { products });
});

export default router;
