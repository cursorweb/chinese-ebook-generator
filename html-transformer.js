/*
Single-page html to be converted to be pdf
*/

import * as cheerio from "cheerio";
import fs from "fs";

// todo: get a good configurable loader
import data from "./output/json/zsh.json" assert { type: "json" };
const BOOK_ID = "zsh";

/*
Format:
<h1>[chapter]</h1>
<pre><p>[content]</p></pre>
*/


const templateText = fs.readFileSync(`templates/single/${BOOK_ID}.html`, "utf8");
const $out = cheerio.load(templateText);

for (const { title, subtitle = null, content } of data.pages) {
    createTitle(title, subtitle);
    createMainText(content);
}

createCredits();

function createMainText(content) {
    const pre = $out("<pre>").append($out("<p>").text(content));
    $out("main").append(pre);
}

function createTitle(title, subtitle = null) {
    $out("main").append($out("<h1>").text(title));

    if (subtitle) {
        $out("main").append($out("<h2>").text(subtitle));
    }
}

function createCredits() {
    const footer = $out("<footer>").html(`版权归本<a href="${data.source}" target="_blank">这个网站</a>。`);
    footer.css({
        "font-size": 24,
        "text-align": "center",
        "padding": 8,
    });
    $out('main').after(footer);
}

const out = $out.html();
fs.writeFileSync(`output/formatted/${BOOK_ID}.html`, out);