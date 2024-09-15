import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * @param {cheerio.CheerioAPI} $
 */
export function createMainText($, content) {
    const pre = $("<pre>").append($("<p>").text(content));
    $("main").append(pre);
}

/**
 * @param {cheerio.CheerioAPI} $
 */
export function createTitle($, title, subtitle = null) {
    $("main").append($("<h1>").text(title));

    if (subtitle) {
        $("main").append($("<h2>").text(subtitle));
    }
}

/**
 * @param {cheerio.CheerioAPI} $
 */
export function createNav($, idx, data) {
    const nav = $("<nav>");
    nav.css({
        "display": "flex",
        "flex-direction": "row",
        "justify-content": "space-between",
        "font-size": 24,
        "font-family": "sans-serif",
    });

    if (idx > 0) {
        nav.append($(`<div><a href="${idx - 1}.html">上一页</a></div>`));
    } else {
        nav.append($("<div>"));
    }

    nav.append($(`<div>${idx} / ${data.pages.length - 1}</div>`));

    if (idx < data.pages.length - 1) {
        nav.append($(`<div><a href="${idx + 1}.html">下一页</a></div>`));
    } else {
        nav.append($("<div>"));
    }

    $("main").append(nav);
}

/**
 * @param {cheerio.CheerioAPI} $
 */
export function createCredits($, data) {
    const footer = $("<footer>").html(`版权归本<a href="${data.source}" target="_blank">这个网站</a>。`);
    footer.css({
        "font-size": 24,
        "text-align": "center",
        "padding": 8,
    });
    $('main').after(footer);
}

/**
 * @param {string} file
 * @returns {{
 *  source: string,
 *  pages: ({
 *      title: string;
 *      subtitle?: string;
 *      content: string;
 *  })[]
 * }}
 */
export function readJSON(file) {
    const obj = JSON.parse(fs.readFileSync(path.join(__dirname, file), "utf8"));
    return obj;
}