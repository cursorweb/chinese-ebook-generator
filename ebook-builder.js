/*
Builds multi-page ebook
*/

import * as cheerio from "cheerio";
import fs from "fs";

/*
<h1>[chapter]</h1>
<pre><p>[content]</p></pre>
*/

const templateText = fs.readFileSync("templates/ebook/zsh.html", "utf8");
// const chapters = 62;
let $out = cheerio.load(templateText);

const source = fs.readFileSync("output/formatted/zsh.html", "utf8");



// let totalI = 0;

// for (let i = 0; i < chapters; i++) {
//     $out = cheerio.load(templateText);

//     const text = fs.readFileSync(`output/scraped/${i}.html`, "utf8");
//     const $ = cheerio.load(text);

//     let content = $("p").text();
//     // content = content.trim().split("\n").map(s => s.trim()).join("\n");
//     const pre = $("<pre>").append($("<p>").text(content));

//     let title = $("h1").text();
//     // const h1 = $("<h1>").text(title);
//     {
//         const [_, _1, titleText, subTitle] = title.split(/\s+/);
//         $out("main").append($("<h1>").text(titleText), $("<h2>").text(subTitle));
//         // $out("main").append();
//     }

//     $out("main").append(pre);

//     if (totalI > 0) {
//         $out("main").append($(`<div><a href="${totalI - 1}.html">上</a></div>`));
//     }

//     if (totalI < chapters - 1) {
//         $out("main").append($(`<div><a href="${i + 1}.html">下</a></div>`));
//     }

//     const out = $out.html();
//     fs.writeFileSync(`output/ebook/mengzhihai/${i}.html`, out);
// }


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