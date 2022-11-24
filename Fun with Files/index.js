const path = require("path");
const app = require("..");

app.get("/FunWithFiles/Puzzle.rar", (req, res) => {
    const filePath = path.join(__dirname, "public", "Puzzle.rar");
    console.log("Serving file " + filePath);
    return res.sendFile(filePath);
});
