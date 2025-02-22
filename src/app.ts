import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import { ProductRoutes } from "./app/models/products/product.routes";
import { OrderRoutes } from "./app/models/orders/order.routes";
import UserRoutes from "./app/models/users/user.routes";

const app = express();
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/users", UserRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (_: Request, res: Response) => {
  res.send("Hello World again!");
});

export default app;
