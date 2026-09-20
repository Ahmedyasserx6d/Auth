import { Request,Response,NextFunction } from "express";

interface authRequest extends Request {
    user?:any;
}

export const checkRole = (roles:string[]) => {
    return (req: authRequest, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user?.roles)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        next();
    }
}