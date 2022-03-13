import path from "path";

// mocking the environment variables used by the server
process.env.PUBLIC_DIR_PATH = path.join(__dirname, "_fixtures");
process.env.HTML_TEMPLATE_PATH = path.join(__dirname, "_fixtures/index.html");