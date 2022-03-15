import express from "express";
import bodyParser from "body-parser";
import errorMiddleware from "./middleware/errorMiddleware";
import reactMiddleware from "./middleware/reactMiddleware";
import useRouting from "./middleware/routing";
import { PUBLIC_DIR_PATH } from "./configuration";

const cors = require('cors');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            // access-control-allow-credentials:true
    optionSuccessStatus:200
}

// Split the express app definition to make its easier to test.

export default function createServer() {
    
    const server = express();

    server.use(cors(corsOptions));

    server.use(bodyParser.urlencoded({ extended: true }));

    server.use(express.static(PUBLIC_DIR_PATH, {
        index: false // The static middleware don't serve index.html. The ssr content won't be serverd otherwise.
    }));

    server.use(express.static('build'));

    useRouting(server);

    // renders the react app. The corresponding route will be handled by react router
    server.use(/.*/, reactMiddleware());

    server.use(errorMiddleware());

    return server;
}
