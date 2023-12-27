let PDFDocument = require("pdfkit");
const fs = require("fs");

let doc = new PDFDocument
doc.pipe(fs.createWriteStream("demo.pdf"));
doc.image("./public/docs/avatar_1703304004.png", {
    fit: [500, 400],
    align: "center",
    valign: "center"
});
/* // Para agregar paginas con mas imágenes
doc.addPage()
    .image("./public/docs/avatar_1703304157.png", {
        fit: [500, 400],
        align: "center",
        valign: "center"
});
*/

doc.end();

