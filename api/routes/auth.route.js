import express from "express";
import { signup, signin, signout } from "../controllers/auth.controller.js";
const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signin);
route.get("/signout", signout);

export default route;
