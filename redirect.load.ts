import { app } from ".";

app.get("/_redirect/approximations", (_, res) => {
    return res.redirect(301, "/_external/Dino_Master2000/Approximations/geochecker");
});
