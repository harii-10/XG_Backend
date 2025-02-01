import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "../models/User.js"; 
import config from "../config.js";
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

// Check for JWT_SECRET
if (!config.jwtSecret) {
  console.error("JWT_SECRET is not defined in environment variables");
  process.exit(1);
}

// Add explicit OPTIONS handling
router.options('/signup', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://xen-guard-frontend.vercel.app');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/login', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://xen-guard-frontend.vercel.app');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

// User Signup Route
router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  signup
);

// User Login Route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").exists().withMessage("Password is required"),
  ],
  login
);

export default router;
