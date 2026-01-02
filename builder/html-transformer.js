/*
Single-page html to be converted to be pdf
*/

import * as cheerio from "cheerio";
import fs from "fs";

import { createTitle, createMainText, createCredits, readJSON } from "./util.js";

/*
Format:
<h1>[chapter]</h1>
<pre><p>[content]</p></pre>
*/

export default function run(BOOK_ID) {
    const data = readJSON(`../output/json/${BOOK_ID}.json`);
    const templateText = fs.readFileSync(`templates/single/${BOOK_ID}.html`, "utf8");
    const $ = cheerio.load(templateText);

    for (const { title, subtitle = null, content } of data.pages) {
        createTitle($, title, subtitle);
        createMainText($, content);
    }

    createCredits($, data);

    const out = $.html();
    fs.writeFileSync(`output/formatted/${BOOK_ID}.html`, out);
}