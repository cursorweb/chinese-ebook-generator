// console.log("already used");
// process.exit(0);

import fetch from "node-fetch";
import fs from "fs";

const URL = "https://www.kanunu8.com/book3/6654";
const CHARSET = "gbk";

const start = 51035;
const final = 51044;


if (!fs.existsSync("output/scraped")) {
    fs.mkdirSync("output/scraped");
}

for (let i = start; i <= final; i++) {
    const text = await fetch(`${URL}/${i.toString().padStart(2, '0')}.html`, {
        headers: {
            "Content-Type": `text/plain; charset=${CHARSET}`
        }
    })
        .then(res => res.arrayBuffer())
        .then(buffer => {
            const decoder = new TextDecoder(CHARSET);
            return decoder.decode(buffer);
        });

    fs.writeFileSync(`output/scraped/${i - start}.html`, text);
}