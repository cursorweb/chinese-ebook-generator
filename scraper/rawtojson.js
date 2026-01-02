/*
Convert raw output to easy-to-use json format
*/

import * as cheerio from "cheerio";
import fs from "fs";

const MAX_CHAPTER = 9; // max filename
const BOOK_ID = "shan";
const SOURCE = "https://www.kanunu8.com/book3/6654/";

/** @type {{ title: string, subtitle?: string, content: string }[]} */
const pages = [];
const out = {
    source: SOURCE,
    pages,
};

if (!fs.existsSync("output/json")) {
    fs.mkdirSync("output/json");
}

for (let i = 0; i <= MAX_CHAPTER; i++) {
    const text = fs.readFileSync(`output/scraped/${i}.html`, "utf8");
    const $ = cheerio.load(text);

    let rawContent = $("#neirong p").text().trim();
    const content = rawContent;
    let rawTitle = $(".book-content h1").text().trim().split(" ");

    const title = rawTitle[2];
    const subtitle = rawTitle[3];

    pages.push({
        title,
        subtitle,
        content
    });
}


fs.writeFileSync(`output/json/${BOOK_ID}.json`, JSON.stringify(out));