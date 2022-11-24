require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const shell = require("shelljs");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(3001);

app.get("/deploy", (req, res) => {
    if (req.query.token != process.env.DEPLOY_TOKEN) return res.sendStatus(401);

    console.log("Pulling from github");
    let result = shell.exec("git pull");

    if (result.code != 0) return res.sendStatus(500);
    return res.sendStatus(200);
});