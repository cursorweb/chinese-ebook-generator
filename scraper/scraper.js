console.log("already used");
process.exit(0);

import fetch from "node-fetch";
import fs from "fs";

const URL = "https://www.kanunu8.com/book3/6635";

const start = 50878;
const final = 50885;

for (let i = start; i <= final; i++) {
    const text = await fetch(`${URL}/${i}.html`, {
        headers: {
            "Content-Type": "text/plain; charset=gbk"
        }
    })
        .then(res => res.arrayBuffer())
        .then(buffer => {
            const decoder = new TextDecoder("gbk");
            return decoder.decode(buffer);
        });

    fs.writeFileSync(`output/scraped/${i - start}.html`, text);
}