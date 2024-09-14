// console.log("already used");
// process.exit(0);

import fetch from "node-fetch";
import fs from "fs";

const URL = "https://www.xuges.com/kh/nk/zsh/";

const start = 1;
const final = 63;

for (let i = start; i <= final; i++) {
    const text = await fetch(`${URL}/${i.toString().padStart(2, '0')}.htm`, {
        headers: {
            "Content-Type": "text/plain; charset=utf8"
        }
    })
        .then(res => res.arrayBuffer())
        .then(buffer => {
            const decoder = new TextDecoder("utf8");
            return decoder.decode(buffer);
        });

    fs.writeFileSync(`output/scraped/${i - start}.html`, text);
}