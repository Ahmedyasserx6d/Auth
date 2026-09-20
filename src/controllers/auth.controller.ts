import User from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: any;
}
// Register a new user
export const registerUser = async (req: Request, res: Response) => {
    try{
        const { email, password ,roles} = req.body;
        // check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the password and create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await new User({
            email,
            password: hashedPassword,
            roles: roles || "user"
        }).save();
        res.status(201).json({ message: "User registered successfully" , user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body;
        // check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }   
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });  
        } 
        const isvalidPassword = await bcrypt.compare(password, user.password);
        if (!isvalidPassword) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign(
            { userId: user._id , roles: user.roles},
            process.env.JWT_SECRET || "JDDHDHDJSAK",
            { expiresIn: "1h" }
        );
        res.status(200).json({ 
            message: "User logged in successfully",
             token,
            user: user
            });


    }catch (error) {
        res.status(500).json({ message: "Error logging in user" });
    }

}

export const getUser = async (req: AuthRequest, res: Response) => {
    try{
        const userId = req.user.userId;
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.status(200).json({ user });

    }catch(err){
        res.status(500).json({ message: "Error fetching user" });
    }
}