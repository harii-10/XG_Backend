import express from "express";
import { body } from "express-validator";
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

// Remove the OPTIONS handlers and let the global CORS handle it

router.post(
    "/signup",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Valid email is required"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    ],
    signup
);

router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Valid email is required"),
        body("password").exists().withMessage("Password is required"),
    ],
    login
);

export default router;
