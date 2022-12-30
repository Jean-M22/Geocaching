import { Request, Response } from "express";
import { join } from "path";
import { app } from "..";


app.get("/BucurestiGeoArt", (req, res) => {
    if (doRedirects(req, res)) return;

    return res.sendStatus(404);
});

function doRedirects(req: Request, res: Response) {
    if (req.cookies.language != "ro" && req.cookies.language != "en") {
        res.sendFile(join(__dirname, "html", "language.html"));
        return true;
    }

    if (!req.cookies.consent) {
        res.sendFile(join(__dirname, "html", "consent.html"));
        return true;
    }

    return false;
}
