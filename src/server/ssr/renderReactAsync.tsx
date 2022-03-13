import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import fs from "fs";
import { ServerStyleSheet } from "styled-components";
import { HTML_TEMPLATE_PATH } from "../configuration";
import App from "../../client/App";
import { PrerenderData } from "../../shared/PrerenderedData";

/**
 * Replace html content and return new html string
 */
function buildHtml(templateHtml: string, reactHtml: string, styleTags: string, dataTag: string) {

  const pattern = /(?<head><head>)|(?<root><div\sid="root">)/g;
  
  return templateHtml.replace(pattern, (match, ...params: any[]) => {
      const groups = params.pop();

      if (groups.head) {
        return groups.head + styleTags;
      }

      if (groups.root) {
        return dataTag + groups.root + reactHtml;
      }
      
      return match;
  });

}

/**
 * Render React Component to String with style (styled-component library is not used so style will not use here)
 */
function renderToStringWithStyles(component: JSX.Element) {
  const sheet = new ServerStyleSheet();
  try {
      const reactHtml = renderToString(sheet.collectStyles(component));
      const styleTags = sheet.getStyleTags();
      return [reactHtml, styleTags];
  }
  finally {
      sheet.seal();
  }
}

/**
 * Renders the react App as a html string.
 * @param url The render url.
 * @param prerenderedObject An object created in the server that can be accessed in the client side.
 * @returns A html string;
 */
export default async function renderReactAsync(url: string, prerenderedObject?: unknown) {

  // read the html template file

  const staticHtmlContent = await fs.promises.readFile(HTML_TEMPLATE_PATH, { encoding: "utf-8" });

  // create an element to store server side data

  const dataElement = PrerenderData.saveToDom(prerenderedObject);

  const WrappedApp = (
      <StaticRouter location={url}>
          <App serverData={prerenderedObject ?? null}/>
      </StaticRouter>
  );

  // render the react html content and the styled-component style sheet as string.

  const [reactContent, styleTags] = renderToStringWithStyles(WrappedApp);

  // combine all parts together

  const renderedHtml = buildHtml(staticHtmlContent, reactContent, styleTags, dataElement);

  return renderedHtml;
}