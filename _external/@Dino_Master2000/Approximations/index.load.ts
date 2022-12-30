import { join } from "path";
import { app } from "../../..";

app.get("/_external/Dino_Master2000/Approximations/geochecker", (req, res) => {
    res.sendFile(join(__dirname, "/public/geochecker.html"));
});
