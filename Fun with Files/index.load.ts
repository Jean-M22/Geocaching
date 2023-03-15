import { join } from "path";
import { app } from "..";

app.get("/FunWithFiles/Puzzle.rar", (req, res) => {
    return res.sendFile(join(__dirname, "public", "Puzzle.rar"));
});
