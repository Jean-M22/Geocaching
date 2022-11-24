const app = require("..");
const links = require("./data/links.json");
const solution = require("./data/solution.json");

app.get("/ahref/link", (req, res) => {
    if (!req.query.id) return res.sendStatus(400);
    
    const id = parseInt(req.query.id);
    if (isNaN(id) || !isFinite(id)) return res.sendStatus(400);

    if (id == solution.answer) return res.redirect(rand(solution.redirects));
    return res.redirect(rand(links));
});

function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
