import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export default function authMiddleware(
    request: Request, response: Response, next: NextFunction
) {
    dotenv.config();
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(401).json({ error: "JWToken não encontrado." });
    }

    const token = authorization.replace("Bearer", "").trim();

    try {
        const data = jwt.verify(token, process.env.SECRET!);
        
        const { id } = data as TokenPayload;

        request.userId = id;

        return next();
    } catch {
        return response.status(401);
    } 

};