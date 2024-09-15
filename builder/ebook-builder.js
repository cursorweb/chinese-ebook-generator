/*
Builds multi-page ebook
*/

import * as cheerio from "cheerio";
import fs from "fs";

import { createTitle, createMainText, createNav, createCredits, readJSON } from "./util.js";

const BOOK_ID = "zsh";
// import data from "../output/json/zsh.json" assert { type: "json" };

const data = readJSON(`../output/json/${BOOK_ID}.json`);
const templateText = fs.readFileSync(`templates/ebook/${BOOK_ID}.html`, "utf8");
/** @type {cheerio.CheerioAPI} */
let $;

if (!fs.existsSync(`output/ebook/${BOOK_ID}`)) {
    fs.mkdirSync(`output/ebook/${BOOK_ID}`);
}

for (let i = 0; i < data.pages.length; i++) {
    const { title, subtitle = null, content } = data.pages[i];
    $ = cheerio.load(templateText);

    createTitle($, title, subtitle);
    createMainText($, content);
    createNav($, i, data);

    if (i == data.pages.length - 1) {
        createCredits($, data);
    }

    const out = $.html();
    fs.writeFileSync(`output/ebook/${BOOK_ID}/${i}.html`, out);
}
