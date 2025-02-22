import { Request, Response } from "express";
import ProductValidationSchema from "./product.validation";
import { ProductServices } from "./product.services";
import { Product } from "./product.model";

// Create a new product
const createProduct = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const existingProduct = await Product.findOne({
      name,
    });

    if (existingProduct) {
      return res.status(400).json({
        message: "Product already exists",
        success: false,
      });
    }

    const zodParser = ProductValidationSchema.parse(req.body);
    const result = await ProductServices.createAProductIntoDB(zodParser);
    res.status(201).json({
      message: "Product created successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
      error,
    });
  }
};

// Get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    const products = await ProductServices.getProductsFromDB(q as string);
    res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
      error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await ProductServices.getOneProductFromDB(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Product fetched successfully",
      success: true,
      data: product,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
      error,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const data = req.body;
    const updProduct = await ProductServices.updateProductIntoDB(
      productId,
      data
    );

    if (!updProduct) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      success: true,
      data: updProduct,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
      error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await ProductServices.deleteProductFromDB(productId);
    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      success: true,
      data: deletedProduct,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
      error,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
