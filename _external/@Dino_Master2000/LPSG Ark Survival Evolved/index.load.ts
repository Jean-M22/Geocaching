import { join } from "path";
import { app } from "../../..";
import { password } from "./data/password.json";

app.get("/_external/Dino_Master2000/LPSGArkSurvivalEvolved/puzzle", (req, res) => {
    res.sendFile(join(__dirname, "/public/puzzle.html"));
});

app.post("/_external/Dino_Master2000/LPSGArkSurvivalEvolved/result", (req, res) => {
    if (req.body.password != password) return res.redirect(301, "/_external/Dino_Master2000/LPSGArkSurvivalEvolved/puzzle?incorrect");
    res.sendFile(join(__dirname, "/data/result.jpg"));
});
