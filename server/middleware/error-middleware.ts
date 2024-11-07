import { Request, Response, NextFunction } from "express";
import { config } from "../lib/lib";

export function notFound(req : Request,res : Response,next : NextFunction){
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

export function errorHandler(err : Error, req: Request, res:Response,next : NextFunction){
    const statusCode  = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message : err.message,
        stack : config.node_env === "production" ? null : err.stack
    })
}