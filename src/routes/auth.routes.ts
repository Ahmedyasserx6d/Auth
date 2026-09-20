import { registerUser,loginUser,getUser} from "../controllers/auth.controller";
import express from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { checkRole } from "../middleware/role.middleware";


const router = express.Router();
    
// Route for user registration      
router.post("/register", registerUser);

// Route for user login

 router.post("/login", loginUser);

 // Route for protected route

 router.get("/protected", verifyToken, (req, res) => {
    res.status(200).json({ message: "You have accessed a protected route"});
});

// Route for protected route with role check
router.get("/admin",verifyToken,checkRole(["admin"]),(req,res)=>{
    res.status(200).json({ message: "You have accessed an admin route"});
});
router.get("/me", verifyToken, getUser,(req,res)=>{
    res.status(200).json({
        message: "You have accessed your user information"
    })
})
export default router;  