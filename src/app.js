import express from "express";
import cors from "cors";
import morgan from "morgan";
 
import productosRoutes from "./routes/productos.routes.js";
import ordenesRoutes from "./routes/ordenes.routes.js";
import reservasRoutes from "./routes/reservas.routes.js";   
import authRoutes from "./routes/authRoutes.js"; // Importa las rutas de autenticación
import dashboardRoutes from "./routes/dashboard.routes.js";


import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api/productos", productosRoutes);
app.use("/api/ordenes", ordenesRoutes);
app.use("/api/reservas", reservasRoutes);
app.use("/api", authRoutes); // Usa las rutas de autenticación
app.use("/api", dashboardRoutes);


// Configura la carpeta pública para servir archivos estáticos
app.use(express.static("public"));
export default app;
