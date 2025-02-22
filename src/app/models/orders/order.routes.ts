import express from "express";
import { OrderController } from "./order.controller";
const router = express.Router();

router.post("/", OrderController.createOrder as express.RequestHandler);
router.get("/", OrderController.getAllOrders as express.RequestHandler);

export const OrderRoutes = router;
