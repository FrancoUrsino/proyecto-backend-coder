import express from 'express';
const router = express.Router();

let products = [
    { id: 1, name: 'Producto 1', price: 100 },
    { id: 2, name: 'Producto 2', price: 200 },
];
router.get('/', (req, res) => {
    res.render('home', { products });
});
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { products });
});

export default router;
