const BOOK_ID = "shan";

console.log("building single-page");
import htmlTransform from "./builder/html-transformer.js";
htmlTransform(BOOK_ID);

console.log("building ebook");
import ebookBuilder from "./builder/ebook-builder.js";
ebookBuilder(BOOK_ID);
