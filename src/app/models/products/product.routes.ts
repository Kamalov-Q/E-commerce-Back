import express from "express";
import { ProductController } from "./productcontroller";
import { verifyToken } from "../../middleware/auth.middleware";
import { isAdmin } from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/", ProductController.getAllProducts as express.RequestHandler);
router.get(
  "/:productId",
  ProductController.getSingleProduct as express.RequestHandler
);
router.post(
  "/",
  verifyToken, isAdmin,  // only admin can create products
  ProductController.createProduct as express.RequestHandler
);
router.put(
  "/:productId",
  verifyToken, isAdmin,  // only admin can update products
  ProductController.updateProduct as express.RequestHandler
);
router.delete(
  "/:productId",
  verifyToken,
  isAdmin,
  ProductController.deleteProduct as express.RequestHandler
);

export const ProductRoutes = router;
