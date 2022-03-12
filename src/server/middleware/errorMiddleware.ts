import {Request, Response, NextFunction} from "express";

/**
 * Middleware for error handling.
 * @returns The error middleware function.
 */
export function errorMiddleware() {

    return function(err: Error, req: Request, res: Response, next: NextFunction) {
        console.error(err);
        res.status(500).send("Internal server error.   Stack:   " + err.stack);
    }

}