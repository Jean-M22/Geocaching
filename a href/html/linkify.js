const fs = require("fs");

const input = fs.readFileSync("input.html", "utf-8");
let output = "";

const links = {};

let inTag = false;
let inEncoding = false;
for (const i in input.split("")) {
    const c = input[i];
    switch (c) {
        case "\n":
        case "\r":
        case " ":
            output += c;
            break;

        case "<":
            inTag = true;
            output += c;
            break;

        case ">":
            output += c;
            inTag = false;
            break;

        case "&":
            inEncoding = true;
            output += `<a href="http://165.227.255.220/ahref/link?id=${i}">`;
            output += c;
            break;
        
        case ";":
            output += c;
            output += "</a>";
            inEncoding = false;
            break;

        default:
            if (inTag || inEncoding) {
                output += c;
                continue;
            }

            output += `<a href="http://165.227.255.220/ahref/link?id=${i}">`;
            output += c;
            output += "</a>";

            break;
    }
}

fs.writeFileSync("output.html", output);
