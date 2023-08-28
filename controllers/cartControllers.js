import Cart from "../models/Cart.js";

//add to cart
export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || !quantity) {
    return res.status(400).json({ error: "Missing required data" });
  }

  try {
    // Find the user's cart or create a new one if it doesn't exist
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const existingItem = cart.items.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    const updatedCart = await cart.save();

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

//Get user cart
export const getCart = async (req, res) => {
  const userId = req.params.userId;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

//update items in cart quantity
export const updateCart = async (req, res) => {
  const itemId = req.params.itemId;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOneAndUpdate(
      { "items._id": itemId },
      { $set: { "items.$.quantity": quantity } },
      { new: true }
    ).populate("items.productId");

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

//delete cart items
export const deleteCart = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const cart = await Cart.findOneAndUpdate(
      { "items._id": itemId },
      { $pull: { items: { _id: itemId } } },
      { new: true }
    ).populate("items.productId");

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

//delete cart
export const deleteCartForUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedCart = await Cart.findOneAndDelete({ userId });

    if (!deletedCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the cart" });
  }
};
