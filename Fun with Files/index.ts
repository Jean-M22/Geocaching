import { join } from "path";
import { app } from "..";

app.get("/FunWithFiles/Puzzle.rar", (req, res) => {
    const filePath = join(__dirname, "public", "Puzzle.rar");
    console.log("Serving file " + filePath);
    return res.sendFile(filePath);
});
