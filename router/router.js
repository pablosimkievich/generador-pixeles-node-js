const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");


router.get("/", controller.getAllFiles);
router.post("/save-PNG-file", controller.savePNGfile)
router.get("/download-file/:indexOfFile", controller.downloadFile);
router.get("/convert-to-PDF/:indexOfFile", controller.convertToPDF);
router.post("/download-PDF/:nameOfFile", controller.downloadPDF);
router.post("/delete-file/:indexOfFile", controller.deleteFile);


module.exports = router; 