import { Express } from "express";
import { renderReactAsync } from "../ssr/renderReactAsync";
import { UserModel } from "../../shared/models/user.model";

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

  // User Page Route
  app.get("/user", async (req, res) => {

    const model: UserModel = {
      id: 1000,
      name: "Ta Quang Tien",
      age: 10
    };

    try {
      const html = await renderReactAsync(req.url, model);
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