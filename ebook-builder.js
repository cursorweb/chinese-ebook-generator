/*
Builds multi-page ebook
*/

import * as cheerio from "cheerio";
import fs from "fs";

const BOOK_ID = "zsh";
import data from "./output/json/zsh.json" assert { type: "json" };

/*
<h1>[chapter]</h1>
<pre><p>[content]</p></pre>
*/

const templateText = fs.readFileSync(`templates/ebook/${BOOK_ID}.html`, "utf8");
/** @type {cheerio.CheerioAPI} */
let $out;

if (!fs.existsSync(`output/ebook/${BOOK_ID}`)) {
    fs.mkdirSync(`output/ebook/${BOOK_ID}`);
}

for (let i = 0; i < data.pages.length; i++) {
    const { title, subtitle = null, content } = data.pages[i];
    $out = cheerio.load(templateText);

    createTitle(title, subtitle);
    createMainText(content);
    createNav(i);

    if (i == data.pages.length - 1) {
        createCredits();
    }

    const out = $out.html();
    fs.writeFileSync(`output/ebook/${BOOK_ID}/${i}.html`, out);
}


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

function createNav(idx) {
    const nav = $out("<nav>");
    nav.css({
        "display": "flex",
        "flex-direction": "row",
        "justify-content": "space-between",
    });

    if (idx > 0) {
        nav.append($out(`<div><a href="${idx - 1}.html">上一页</a></div>`));
    }

    if (idx < data.pages.length - 1) {
        nav.append($out(`<div><a href="${idx + 1}.html">下一页</a></div>`));
    }

    $out("main").append(nav);
}


function createCredits() {
    const footer = $out("<footer>").html(`版权归本<a href="${data.source}" target="_blank">这个网站</a>。`);
    footer.css({
        "font-size": 24,
        "text-align": "center",
        "padding": 8,
        // "background": "rgba(0, 0, 0, 0.1)"
    });
    $out('main').after(footer);
}