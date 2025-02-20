import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import exphbs from 'express-handlebars';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/productsRouter.js';
import viewRoutes from './routes/viewRoutes.js';
import ProductManager from './managers/ProductManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);
const productManager = new ProductManager();

app.set("io", io);
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/products', productRoutes);
app.use('/', viewRoutes);

io.on('connection', async (socket) => {
    console.log('Usuario conectado');

    try {
        const products = await productManager.getProducts();
        console.log("Productos enviados:", products);

        socket.emit("updateProducts", products);
    } catch (error) {
        console.error("Error obteniendo productos:", error);
        socket.emit("updateProducts", []);
    }
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
