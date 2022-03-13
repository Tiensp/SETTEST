import path from "path";


export const PORT = process.env.PORT ?? 3000;
    
export const PUBLIC_DIR_PATH = process.env.PUBLIC_DIR_PATH ?? path.join(__dirname, "build");
    
export const HTML_TEMPLATE_PATH = process.env.HTML_TEMPLATE_PATH ?? path.join(__dirname, "index.html");
