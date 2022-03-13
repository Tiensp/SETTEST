import createServer from "./server";
import { PORT } from "./configuration";

const server = createServer();

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});