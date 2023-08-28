import express from "express";
import {
  addToCart,
  getCart,
  updateCart,
  deleteCart,
  deleteCartForUser,
} from "../controllers/cartControllers.js";
const router = express.Router();

//add to cart
router.post("/add", addToCart);

//get Cart
router.get("/:userId", getCart);

router.delete("/delete/:userId", deleteCartForUser);

//update cart
router.put("/update/:itemId", updateCart);

//delete cart

router.delete("/remove/:itemId", deleteCart);

export default router;
