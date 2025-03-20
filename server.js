import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import exphbs from "express-handlebars";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/products.router.js";
import viewRoutes from "./routes/view.routes.js";
import cartRoutes from "./routes/cart.router.js"; 
import ProductManager from "./managers/Product.manager.js";
import checkoutRouter from "./routes/checkout.router.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connectDB();

const app = express();
const server = createServer(app);
const io = new Server(server);
const productManager = new ProductManager();

app.set("io", io);

const hbs = exphbs.create({
  helpers: {
    eq: (a, b) => a === b,
  }
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.use("/", viewRoutes);
app.use("/productos", productRoutes);
app.use("/carrito", cartRoutes);
app.use("/checkout", checkoutRouter);

io.on("connection", async (socket) => {
  console.log("Usuario conectado");

  try {
    const products = await productManager.getProducts();
    console.log("Productos enviados:", products);
    socket.emit("updateProducts", products);
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    socket.emit("updateProducts", []);
  }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
