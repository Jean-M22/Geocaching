import { join } from "path";
import { app } from "..";
import questions from "./data/questions.json";

export type Answer = {type: "contain_text" | "contain_word", value: string | string[]} | 
                     {type: "and" | "or", value: Answer[]} |
                     {type: "bonus", value: number};

app.get("/BucurestiGeoArt/cache/:letter/:number", (req, res) => {
    if (!questions.hasOwnProperty(req.params.letter.toUpperCase())) return res.status(400).send("This cache page is temporarily unavailable. It will be updated soon.");
    const letter = req.params.letter.toUpperCase() as keyof typeof questions;
    
    if (!questions[letter].caches.hasOwnProperty(req.params.number)) return res.status(400).send("This cache page is temporarily unavailable. It will be updated soon.");
    const number = req.params.number as keyof typeof questions[typeof letter]["caches"];
    
    return res.render(join(__dirname, "/public/cache.ejs"), {
        letter: letter,
        number: number,
        displayLetter: letter.replace("1", "¹").replace("2", "²"),
        topic: questions[letter].topic,
        question: questions[letter].caches[number].question,
        color: getColor(questions[letter].color, parseInt(number)),
    });
});

app.get("/BucurestiGeoArt/cache/:letter/:number/check", (req, res) => {
    res.redirect(302, `/BucurestiGeoArt/cache/${req.params.letter}/${req.params.number}`);
})

app.post("/BucurestiGeoArt/cache/:letter/:number/check", (req, res) => {
    if (!questions.hasOwnProperty(req.params.letter.toUpperCase())) return res.status(400).send("This cache page is temporarily unavailable. It will be updated soon.");
    const letter = req.params.letter.toUpperCase() as keyof typeof questions;
    
    if (!questions[letter].caches.hasOwnProperty(req.params.number)) return res.status(400).send("This cache page is temporarily unavailable. It will be updated soon.");
    const number = req.params.number as keyof typeof questions[typeof letter]["caches"];

    console.log(`Checking answer for cache ${letter}#${number}: ${req.body.answer}`);

    if (!checkAnswer(req.body.answer, questions[letter].caches[number].answer as Answer)) 
        return res.redirect(302, `/BucurestiGeoArt/cache/${req.params.letter}/${req.params.number}?incorrect`);

    return res.render(join(__dirname, "/public/correct.ejs"), {
        number: number,
        displayLetter: letter.replace("1", "¹").replace("2", "²"),
        topic: questions[letter].topic,
        coords: questions[letter].caches[number].coords,
        bonus_id: questions[letter].bonusId,
        bonus_amount: questions[letter].caches[number].bonusAmount,
        color: getColor(questions[letter].color, parseInt(number)),
    });
});

function checkAnswer(given: string, expected: Answer): boolean {
    switch (expected.type) {
        case "and":
            return expected.value.every(v => checkAnswer(given, v));
        case "or":
            return expected.value.some(v => checkAnswer(given, v));
        case "contain_text":
            return [expected.value].flat().some(v => cleanAnswer(given).includes(v));
        case "contain_word":
            return [expected.value].flat().some(v => new RegExp(`(?:^|\\W)${v}(?:\\W|$)`).test(cleanAnswer(given)));
        case "bonus":
            return Math.abs(parseFloat(given) - calculateBonusAmount(expected.value)) < 0.01;
    }
}

function getColor(color: string, number: number): string {
    if (color != "bonus_inherit") return color;
    return Object.values(questions).find(q => q.bonusId == number)!.color;
}

function cleanAnswer(answer: string): string {
    return answer.toLowerCase().replace(/[ăâ]/g, "a").replace(/î/g, "i").replace(/ș/g, "s").replace(/ț/g, "t");
}

function calculateBonusAmount(id: number): number {
    let total = 0;
    for (const letter in questions) {
        if (!questions.hasOwnProperty(letter)) continue;
        if (letter == "BONUS") continue;
        
        const letterObject = questions[letter as keyof typeof questions];
        if (letterObject.bonusId != id) continue;

        for (const cache of Object.values(letterObject.caches)) {
            total += cache.bonusAmount;
        }
    }
    console.log(total);
    return total;
}
