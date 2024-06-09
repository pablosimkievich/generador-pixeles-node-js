const fs = require("fs");
const path = require("path")
let PDFDocument = require("pdfkit");
const { createCanvas, loadImage } = require("canvas");


// Todos - Lista de archivos
const getAllFiles = async (req, res) => {
  let filesToReverse = fs.readdir("./public/docs", async (error, filesToReverse) => {
    if (error) {
      throw error;
    }
    let files = filesToReverse.reverse();
    res.render("index", { files });
  });
};


// TODO // Generar imagen de pixeles y guardar como archivo PNG
const savePNGfile = async (req, res) => {
  // res.send("Soy Save PNG file");
  const canvasSize = 200;
  const pixelSize = 20;
  const numPixels = canvasSize / pixelSize;

  const canvas = createCanvas(canvasSize, canvasSize);
  const context = canvas.getContext("2d");

  // Función para generar un color de forma aleatoria
  function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  // Función para dibujar un pixel
  function drawPixel(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
  }


  // Función para dibujar un pixel simétrico
  function drawSymmetricPixel(x, y, color) {
    drawPixel(x, y, color);
    drawPixel(numPixels - 1 - x, y, color);
    drawPixel(x, numPixels - 1 - y, color);
    drawPixel(numPixels - 1 - x, numPixels - 1 - y, color);
  }

  // Genera el avatar pixelado con simetría
  for (let x = 0; x < numPixels / 2; x++) {
    for (let y = 0; y < numPixels / 2; y++) {
      const isWhite = Math.random() > 0.5;
      const pixelColor = isWhite ? "#ffffff" : getRandomColor();
      drawSymmetricPixel(x, y, pixelColor);
    }
  }

  // Genera nombre de archivo único usando timestamp
  const timestamp = new Date().getTime();
  const imageName = `avatar_${timestamp}.png`;

  // Guarda la imagen a un archivo
  const imagePath = path.join(__dirname, "../public/docs", imageName);
  const out = fs.createWriteStream(imagePath);
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () => {
    console.log(`Image saved to avatar-image/${imageName}`);
  });

  res.redirect("/");
};


// ! Download archivo PNG 
const downloadFile = async (req, res) => {
  let filesToReverse = fs.readdir("./public/docs", async (error, filesToReverse) => {
    if (error) {
      throw error;
    }
    
    let files = filesToReverse.reverse();
    files.forEach((e, i) => {
      i === Number(req.params.indexOfFile)
        ? res.download(`./public/docs/${e}`)
        : "";
    });
  });
};


// ! Convertir  a PDF y guardar archivo
const convertToPDF = async (req, res) => {
  let filesToReverse = fs.readdir("./public/docs", async (error, filesToReverse) => {
    if (error) {
      throw error;
    }
    let files = filesToReverse.reverse();
    files.forEach(async (e, i) => {
      if (i === Number(req.params.indexOfFile)) {
        let doc = new PDFDocument();
        let PDFfileName = e.split(".")[0];
        doc.pipe(fs.createWriteStream(`./public/download/${PDFfileName}.pdf`));
        doc.image(`./public/docs/${e}`, {
          fit: [500, 400],
          align: "center",
          valign: "center",
        });
        doc.end();
        res.redirect("/");
      }
    });
  });
};


// ! Download archivo PDF 
const  downloadPDF = async (req, res) => {
  // res.send(`Soy PDF Download ${req.params.nameOfFile.split(".")[0]}`)
  let filesToReverse = fs.readdir("./public/download", async (error, filesToReverse) => {
    if (error) {
      throw error;
    }
    let files = filesToReverse.reverse();
    files.forEach((e, i) => {
      e === req.params.nameOfFile.split(".")[0] + ".pdf"
        ? res.download(`./public/download/${e}`)
        : "";
    });
  });
  
};


// ! Borrar archivo PNG
const deleteFile = async (req, res) => {
  let filesToReverse = fs.readdir("./public/docs", async (error, filesToReverse) => {
    if (error) {
      throw error;
    }
    let files = filesToReverse.reverse();
    files.forEach((e, i) => {
      if (i === Number(req.params.indexOfFile)) {
        fs.unlink(`./public/docs/${e}`, (error) => {
          if (error) throw error;
          console.log("Archivo borrado");
          res.redirect("/");
        });
      }
    });
  });
};



module.exports = {
  getAllFiles,
  savePNGfile,
  downloadFile,
  convertToPDF,
  downloadPDF,
  deleteFile,
};
