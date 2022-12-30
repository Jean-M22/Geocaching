import { app } from ".";

app.get("/_redirect/approximations", (_, res) => {
    return res.sendStatus(501);
    res.redirect(301, "");
});
