import { join } from "path";
import { app } from "..";
import questions from "./data/questions.json";

app.get("/BucharestGeoArt/cache/:letter/:number", (req, res) => {
    if (!questions.hasOwnProperty(req.params.letter)) return res.status(400).send("Invalid cache letter");
    const letter = req.params.letter as keyof typeof questions;
    
    if (!questions[letter].caches.hasOwnProperty(req.params.number)) return res.status(400).send("Invalid cache number");
    const number = req.params.number as keyof typeof questions[typeof letter]["caches"];
    
    return res.render(join(__dirname, "/public/cache.ejs"), {
        letter: letter.replace("1", "¹").replace("2", "²"),
        number: number,
        topic: questions[letter].topic,
        question: questions[letter].caches[number].question,
    });
});

app.get("/BucharestGeoArt/cache/:letter/:number/check", (req, res) => {
    res.redirect(302, `/BucharestGeoArt/cache/${req.params.letter}/${req.params.number}`);
})

app.post("/BucharestGeoArt/cache/:letter/:number/check", (req, res) => {
    if (!questions.hasOwnProperty(req.params.letter)) return res.status(400).send("Invalid cache letter");
    const letter = req.params.letter as keyof typeof questions;
    
    if (!questions[letter].caches.hasOwnProperty(req.params.number)) return res.status(400).send("Invalid cache number");
    const number = req.params.number as keyof typeof questions[typeof letter]["caches"];

    if (!checkAnswer(req.body.answer.toLowerCase(), questions[letter].caches[number].answer)) 
        return res.redirect(302, `/BucharestGeoArt/cache/${req.params.letter}/${req.params.number}?incorrect`);

    
    return res.render(join(__dirname, "/public/correct.ejs"), {
        letter: letter.replace("1", "¹").replace("2", "²"),
        number: number,
        topic: questions[letter].topic,
        coords: questions[letter].caches[number].coords,
        bonus_id: questions[letter].bonusId,
        bonus_amount: questions[letter].caches[number].bonusAmount
    });
});

function checkAnswer(given: string, expected: {type: string, value: string[]}): boolean {
    switch (expected.type) {
        case "contain":
            return expected.value.some(v => new RegExp(`(?:^|\\W)${v}(?:\\W|$)`).test(given));
        default:
            return false;
    }
}