const fs = require("fs");

async function validateDownloadPDF(req, res, next) {
    let filesToReverse = fs.readdir("./public/download", async (error, filesToReverse) => {
        if (error) {
            throw error;
          }
          let files = filesToReverse.reverse();
          let nameOfFile = req.params.nameOfFile;
          if (!files.includes(nameOfFile)) {
            return res.redirect("/");
          } 
    });
    next();
};

module.exports = validateDownloadPDF;