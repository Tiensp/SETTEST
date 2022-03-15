import { Express } from "express";
import renderReactAsync from "../ssr/renderReactAsync";

/** Defines the server routings. */
export default function useRouting(app: Express) {

  // HomePage Route
  app.get("/", async (req, res) => {

    try {
        const html = await renderReactAsync(req.url);
        return res.status(200).contentType("text/html").send(html);
    }
    catch (error) {
      return res.status(500).send("Internal server error");
    }

  });

  // User Page Route
  app.get("/history", async (req, res) => {

    try {
      const html = await renderReactAsync(req.url);
      return res.status(200).contentType("text/html").send(html);
    }
    catch (error) {
      return res.status(500).send("Internal server error");
    }

  });

  app.get('*', (req, res)=> {
    res.status(404).send('Page Not Found');
  });
}