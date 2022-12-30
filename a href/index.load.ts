import { app } from "..";
import links from "./data/links.json";
import solution from "./data/solution.json";

app.get("/ahref/link", (req, res) => {
    if (!req.query.id) return res.sendStatus(400);
    
    const id = parseInt(req.query.id.toString());
    if (isNaN(id) || !isFinite(id)) return res.sendStatus(400);

    if (id == solution.answer) return res.redirect(rand(solution.redirects));
    return res.redirect(rand(links));
});

function rand<T>(arr : T[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}
