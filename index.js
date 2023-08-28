import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoute.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/s1/users", userRoutes);
app.use("/api/s1/products", productRoutes);
app.use("/api/s1/cart", cartRoutes);

app.get("/", (req, res) => {
  res.status(200).send("<h2>site</h2>");
});
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server connected to database successfully`);
    });
  })
  .catch((error) => console.log(error));
