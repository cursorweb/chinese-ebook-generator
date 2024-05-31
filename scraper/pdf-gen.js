import html2pdf from "html-pdf-node";
import fs from "fs";

const options = { format: 'A4' };

const file = { content: fs.readFileSync("output/formatted/chengdu.html", "utf8") };
html2pdf.generatePdf(file, options).then(pdfBuffer => {
    // console.log("PDF Buffer:-", pdfBuffer);
    fs.writeFileSync("chengdu.pdf", pdfBuffer);
});