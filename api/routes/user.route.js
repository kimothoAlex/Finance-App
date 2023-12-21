import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { deleteUser, updateUser } from "../controllers/user.controller.js";
const route = express.Router();

route.post("/update-User/:id", verifyUser, updateUser);
route.get("/delete-User/:id", verifyUser, deleteUser);

export default route;
