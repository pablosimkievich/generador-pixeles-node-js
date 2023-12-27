const express = require("express");
const app = express();
const morgan = require('morgan');
const router = require("./router/router"); 

// Middlewares
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(morgan('dev'));  

// Routes 
app.use(router);   

// Port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});
 