import { Express } from "express";
import { renderReactAsync } from "../ssr/renderReactAsync";

/** Defines the server routings. */
export function useRouting(app: Express) {

  // HomePage Route
  app.get("/", async (req, res) => {

    try {
        const html = await renderReactAsync(req.url);
        return res.status(200).contentType("text/html").send(html);
    }
    catch (error) {
      console.log(error);
        return res.status(500).send("Internal server error");
    }

  });

  app.get('*', function(req, res){
    res.status(404).send('Page Not Found');
  });
}