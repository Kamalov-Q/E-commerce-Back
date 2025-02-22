import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createAProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getProductsFromDB = async (searchTerm = "") => {
  const query = searchTerm
    ? {
        $or: [
          {
            name: { $regex: searchTerm, $options: "i" },
          },
          {
            description: { $regex: searchTerm, $options: "i" },
          },
        ],
      }
    : {};
  const products = await Product.find(query);
  return products;
};

const getOneProductFromDB = async (productId: string) => {
  const productOne = await Product.findById(productId);
  return productOne;
};

const updateProductIntoDB = async (
  productId: string,
  productData: TProduct
) => {
  const product = await Product.findByIdAndUpdate(productId, productData, {
    new: true,
  });
  return product;
};

const deleteProductFromDB = async (productId: string) => {
  const deletedProduct = await Product.findByIdAndDelete(productId);
  return deletedProduct;
};

export const ProductServices = {
  createAProductIntoDB,
  getProductsFromDB,
  getOneProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
