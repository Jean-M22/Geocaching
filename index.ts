require("dotenv").config();

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import { existsSync, readdirSync } from "fs";
import { join } from "path";

export const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.listen(3001);

const directories = readdirSync(__dirname);
directories.forEach(directory => {
    if (directory == "node_modules") return;

    const filePath = join(__dirname, directory, "index.ts");
    if (existsSync(filePath)) {
        console.log("Loading index file " + filePath);
        import(filePath);
    }
});
