require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(80);

module.exports = app;

const directories = fs.readdirSync(__dirname);
directories.forEach(directory => {
    if (directory == "node_modules") return;

    const filePath = path.join(__dirname, directory, "index.js");
    if (fs.existsSync(filePath)) {
        console.log("Loading index file " + filePath);
        require(filePath);
    }
});
