import { Request, Response } from "express";

/**
 * Middleware for error handling.
 * @returns The error middleware function.
 */
export default function errorMiddleware() {

    return (err: Error, req: Request, res: Response) => {
        res.status(500).send(`Internal server error.   Stack:  ${err.stack}`);
    }

}