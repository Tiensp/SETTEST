import { NextFunction, Request, Response } from "express";
import renderReactAsync from "../ssr/renderReactAsync";

/**
 * Creates a React Server Side Rendering middleware. 
 * @returns The react SSR middleware function.
 */
export default function reactMiddleware() {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reactHtml = await renderReactAsync(req.url)
            res.set("content-type", "text/html").status(200).send(reactHtml);
        }
        catch (error) {
            next(error);
        }
    
    }

}