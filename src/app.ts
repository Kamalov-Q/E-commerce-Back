import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import { ProductRoutes } from "./app/models/products/product.routes";
import { OrderRoutes } from "./app/models/orders/order.routes";
import UserRoutes from "./app/models/users/user.routes";
import swaggerDocs from "./utils/swagger";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

//Routes
app.use("/api/users", UserRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (_: Request, res: Response) => {
  res.send("API is working!");
  swaggerDocs(app, 5000);
  console.log("Swagger docs available at http://localhost:5000/docs");
  console.log(`Swagger docs available at https://kamalovs-ecommerce.uz/docs`);
});

app.get("/hello", (_: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;

//Completed 23:50 22.02.2025 I am Home Alone now. InshaAllah I will break the leg
