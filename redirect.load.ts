import { app } from ".";

app.get("/_redirect/lpsgark", (_, res) => {
    return res.redirect(302, "/LPSGArkSurvivalEvolved/puzzle");
});

app.get("/_redirect/geoart/:letter/:number", (req, res) => {
    return res.redirect(302, `/BucurestiGeoArt/cache/${req.params.letter.toUpperCase().replace("Ș", "S")}/${req.params.number}`);
});