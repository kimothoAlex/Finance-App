import express from "express";
import {
  signup,
  signin,
  signout,
  google,
} from "../controllers/auth.controller.js";
const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signin);
route.get("/signout", signout);
route.post("/google", google);

export default route;
