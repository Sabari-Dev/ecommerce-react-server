import Product from "../models/Product.js";

//get all products
export const getAllProducts = (req, res) => {
  Product.find()
    .then((products) =>
      res.status(201).json({ success: true, products: products })
    )
    .catch((err) => res.status(400).json({ success: false, message: err }));
};

//get single product

export const getSingleProduct = (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((prod) => res.status(201).json({ success: true, data: prod }))
    .catch((err) => res.status(400).json({ success: false, message: err }));
};
