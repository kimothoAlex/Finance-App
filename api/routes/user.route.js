import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { updateUser } from "../controllers/user.controller.js";
const route = express.Router();

route.post("/update-User/:id", verifyUser, updateUser);

export default route;
