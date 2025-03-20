import mongoose from "mongoose";
import ProductManager from "./managers/Product.manager.js";

const MONGO_URI = "mongodb+srv://francoursino:Fran1234@data.0v4ga.mongodb.net/?retryWrites=true&w=majority&appName=data";

async function testDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado a MongoDB en test.js");

    const productManager = new ProductManager();
    const products = await productManager.getProducts();
    console.log("Productos en la base de datos:", products);

    mongoose.connection.close();
  } catch (error) {
    console.error("Error en test.js:", error);
  }
}

testDB();
