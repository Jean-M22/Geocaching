import { join } from "path";
import { app } from "..";
import { password } from "./data/password.json";

app.get("/LPSGArkSurvivalEvolved/puzzle", (_, res) => {
    res.sendFile(join(__dirname, "/public/puzzle.html"));
});

app.get("/LPSGArkSurvivalEvolved/result", (_, res) => {
    res.redirect(302, "/LPSGArkSurvivalEvolved/puzzle");
})

app.post("/LPSGArkSurvivalEvolved/result", (req, res) => {
    if (req.body.password.toLowerCase() != password) return res.redirect(302, "/LPSGArkSurvivalEvolved/puzzle?incorrect");
    res.sendFile(join(__dirname, "/data/result.jpg"));
});
