/*
Convert raw output to easy-to-use json format
*/

import * as cheerio from "cheerio";
import fs from "fs";

const MAX_CHAPTER = 62; // max filename
const BOOK_ID = "zsh";
const SOURCE = "https://www.xuges.com/kh/nk/zsh";

const pages = [];
const out = {
    source: SOURCE,
    pages,
};

for (let i = 0; i <= MAX_CHAPTER; i++) {
    const text = fs.readFileSync(`output/scraped/${i}.html`, "utf8");
    const $ = cheerio.load(text);

    let rawContent = $("tr:nth-child(4) td").text().trim();
    let content = rawContent.split(/(▼.+?)\n/).filter(i => i);

    if (i == 0) {
        for (let j = 0; j < content.length; j += 2) {
            // remove triangle
            const title = content[j].slice(1);
            pages.push({
                title,
                content: content[j + 1]
            });
        }
        continue;
    }

    if (content[0].includes("▼")) {
        const [title, sub] = content[0].slice(1).split("：");
        pages.push({
            title,
            subtitle: sub,
            content: content.slice(1).join("\n"),
        });
    } else {
        pages[pages.length - 1].content += "\n" + content.join("\n");
    }
}


fs.writeFileSync(`output/json/${BOOK_ID}.json`, JSON.stringify(out));