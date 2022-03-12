import { createServer } from "./server";
import { PORT } from "./configuration";

const server = createServer();

server.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});