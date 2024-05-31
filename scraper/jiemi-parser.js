/*
Ebook and single-page generator for jiemi
*/

import * as cheerio from "cheerio";
import fs from "fs";

const buffer = fs.readFileSync("jiemi.txt");
const decoder = new TextDecoder("gbk");
const text = decoder.decode(buffer);

const splits = text.split(/={5,}|-{5,}/);
const mainContent = splits[4];

const pagesText = mainContent.split(/\s+·\d+·\s+/);

const pages = [];

for (const page of pagesText) {
    const lines = page.trim().split("\n").map(l => l.trim());
    const title = lines[0].split("　"); // full width space
    const ep = lines[1];
    const text = "\t" + lines.slice(2).join("\n\t");
    pages.push({
        title: title, ep: ep.length <= 2 ? ep : null, text
    });
}

const templateText = fs.readFileSync("templates/templatejiemi.html", "utf8");
const ebookTemplateText = fs.readFileSync("templates/ebookjiemi.html", "utf8");
const $single = cheerio.load(templateText);

for (let i = 0; i < pages.length; i++) {
    const { title, ep, text } = pages[i];

    const $page = cheerio.load(ebookTemplateText);

    // ebook and single-doc codes
    if (title) {
        const titleEl = $single(`<h1><span class="title-name">${title[0]}</span> <span class="title-desc">${title[1] || ""}</span></h1>`);
        $single("main").append(titleEl);
        $page("main").append(titleEl);
    }

    if (ep) {
        const epEl = $single("<h2>").text(ep);
        $single("main").append(epEl);
        $page("main").append(epEl);
    }

    const pre = $single("<pre>").append($single("<p>").text(text));

    $single("main").append(pre);
    $page("main").append(pre);

    // extra ebook code
    if (i > 0) {
        $page("main").append($page(`<div><a href="${i - 1}.html">上</a></div>`));
    }

    if (i < pages.length - 1) {
        $page("main").append($page(`<div><a href="${i + 1}.html">下</a></div>`));
    }

    const out = $page.html();
    fs.writeFileSync(`output/ebook/jiemi/${i}.html`, out);
}

const singleOut = $single.html();
fs.writeFileSync("output/formatted/jiemi.html", singleOut);