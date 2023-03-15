import { app } from ".";

app.get("/_redirect/lpsgark", (_, res) => {
    return res.redirect(302, "/LPSGArkSurvivalEvolved/puzzle");
});

app.get("/_redirect/geoart/:letter/:number", (req, res) => {
    return res.redirect(302, `/BucharestGeoArt/cache/${req.params.letter}/${req.params.number}`);
});