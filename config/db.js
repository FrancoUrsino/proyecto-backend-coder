import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("ERROR: No se encontró MONGO_URI en las variables de entorno.");
  process.exit(1);
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`Conectado a MongoDB Atlas en: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Conexión establecida con MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error en la conexión a MongoDB:", err.message);
});

mongoose.connection.on("disconnected", () => {
  console.warn("Desconectado de MongoDB");
});

export default connectDB;
