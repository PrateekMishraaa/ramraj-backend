import express from "express";
// import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";

const router = express.Router();
const JWT = "thisissecret"

// SIGNUP ROUTE
router.post("/signup", async (req, res) => {
    let { FirstName, LastName, Email, Mobile, Address, Password } = req.body;

    if (!FirstName || !LastName || !Email || !Mobile || !Address || !Password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    Email = Email.toLowerCase();

    try {
        const isUserExist = await User.findOne({ Email });
        if (isUserExist) {
            return res.status(409).json({ message: "Email already registered. Please use a different email." });
        }

        // const hashedPassword = await bcrypt.hash(Password, 10);

        const newUser = await User.create({
            FirstName,
            LastName,
            Email,
            Mobile,
            Address,
            Password
        });

        const { Password: _, ...userWithoutPassword } = newUser._doc;

        return res.status(201).json({ message: "User registration successful", user: userWithoutPassword });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
    let { Email, Password } = req.body;

    if (!Email || !Password) {
        return res.status(400).json({ message: "Email and Password are required" });
    }

    Email = Email.toLowerCase();

    try {
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(404).json({ message: "No account found with this email" });
        }

        // const isMatch = await bcrypt.compare(Password, user.Password);
        // if (!isMatch) {
        //     return res.status(401).json({ message: "Invalid password" });
        // }

        const token = Jwt.sign(
            { id: user._id, Email: user.Email },
            JWT,
            { expiresIn: "7d" }
        );
            console.log(token);
        const { Password: _, ...userWithoutPassword } = user._doc;

        return res.status(200).json({
            message: "Login successful",
            token,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
});

export default router;
