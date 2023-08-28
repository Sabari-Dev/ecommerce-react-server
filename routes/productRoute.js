import express from "express";
import {
  getAllProducts,
  getSingleProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

//get all products
router.get("/", getAllProducts);

//get single product
router.get("/product/:id", getSingleProduct);

export default router;
