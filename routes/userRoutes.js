import express from "express";
const router = express.Router();
import {
  createUser,
  getUser,
  deleteUser,
  updateUser,
  getAllUsers,
} from "../controllers/userController.js";

//get all user
router.get("/", getAllUsers);

//create User
router.post("/create", createUser);

//getUser
router.get("/:id", getUser);

//deleteUser
router.delete("/:id", deleteUser);

//update User
router.put("/:id", updateUser);
export default router;
