require("dotenv").config();

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import readdirRecursiveSync from "fs-readdir-recursive";
import { join } from "path";

export const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.listen(3000);

const files = readdirRecursiveSync(__dirname);
for (const file of files) {
    if (file.startsWith("node_modules")) continue;
    if (!file.endsWith(".load.ts")) continue;

    const filePath = join(__dirname, file);
    console.log("Loading file " + filePath);
    require(filePath);
}

app.get("/test", (req, res) => {
    res.sendStatus(200);
});
