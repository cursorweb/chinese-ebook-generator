/*
Single-page html to be converted to be pdf
*/

import * as cheerio from "cheerio";
import fs from "fs";

/*
Format:
<h1>[chapter]</h1>
<pre><p>[content]</p></pre>
*/

const templateText = fs.readFileSync("templates/single/zsh.html", "utf8");
const $out = cheerio.load(templateText);

const maxChapter = 62; // max file *name*

for (let i = 0; i <= maxChapter; i++) {
    const text = fs.readFileSync(`output/scraped/${i}.html`, "utf8");
    const $ = cheerio.load(text);

    let rawContent = $("tr:nth-child(4) td").text().trim();
    let content = rawContent.split(/(▼.+?)\n/).filter(i => i);

    if (i == 0) {
        for (let j = 0; j < content.length; j += 2) {
            // remove triangle
            const title = content[j].slice(1);
            createTitle(title);
            createMainText(content[j + 1]);
        }
        continue;
    }

    // remove triangle
    if (content[0].includes("▼")) {
        const [title, sub] = content[0].slice(1).split("：");
        createTitle(title, sub);
        createMainText(content.slice(1).join("\n"));
    } else {
        createMainText(content.join("\n"));
    }
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

const out = $out.html();
fs.writeFileSync("output/formatted/zsh.html", out);