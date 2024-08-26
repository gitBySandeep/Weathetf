import express from "express";
import { body } from "express-validator";
import { signUp,signIn } from "../Controller/user.controller.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/signUp",
    body("name","invalid name").notEmpty(),
    body("email","invalid email").isEmail().notEmpty(),
    body("password","invalid password").notEmpty(),    
    signUp);

router.post("/signIn",
    signIn);

export default router;  