/*
Single-page html to be converted to be pdf
*/

import * as cheerio from "cheerio";
import fs from "fs";

/*
<h1>[chapter]</h1>
<pre><p>[content]</p></pre>
*/

const templateText = fs.readFileSync("templates/single/mengzhihai.html", "utf8");
const $out = cheerio.load(templateText);

const chapters = 8;

for (let i = 0; i < chapters; i++) {
    const text = fs.readFileSync(`output/scraped/${i}.html`, "utf8");
    const $ = cheerio.load(text);

    let content = $("p").text();
    // content = content.trim().split("\n").map(s => s.trim()).join("\n");
    const pre = $("<pre>").append($("<p>").text(content));

    let title = $("h1").text();
    // const h1 = $("<h1>").text(title);
    {
        const [_, _1, titleText, subTitle] = title.split(/\s+/);
        $out("main").append($("<h1>").text(titleText), $("<h2>").text(subTitle));
        // $out("main").append();
    }


    $out("main").append(pre);
}

const out = $out.html();
fs.writeFileSync("output/formatted/mengzhihai.html", out);