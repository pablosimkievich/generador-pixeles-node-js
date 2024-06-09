
const downloadPNGbuttons = document.querySelectorAll(".download-png-button");
const convertToPDFbuttons = document.querySelectorAll(".convert-to-PDF-button");
const downloadPDFbuttons = document.querySelectorAll(".download-PDF-file");
const deleteFileButtons = document.querySelectorAll(".delete");
const validationTexts = document.querySelectorAll(".validations");

const generateButton = document.querySelector("#generateButton");
const generateText = document.querySelector("#generateText");


generateButton.addEventListener("click", (e) => {
        console.log(generateText)
        generateText.style.color = "green";
        generateText.innerText = "Generando Imagen";
        setTimeout(function() {
            validation.innerText = " ";
        }, 4000) 
    
})



for ( let button of downloadPNGbuttons) {
    button.addEventListener("click", (e) => {
        console.log(e.target)
        console.log(button.id)
        for (let validation of validationTexts) {
            if (validation.id === button.id) {
                validation.style.color = "limegreen";
                validation.innerText = "Archivo PNG descargado con éxito"
                setTimeout(function() {
                    validation.innerText = " ";
                }, 4000)
            }
        }
    })
}

for ( let theButton of convertToPDFbuttons) {
    theButton.addEventListener("click", (e) => {
        console.log(e.target)
        console.log(theButton.id)
        for (let validation of validationTexts) {
            if (validation.id === theButton.id) {
                validation.style.color = "orange";
                validation.innerText = "Convirtiendo a PDF"
                setTimeout(function() {
                    validation.innerText = " ";
                }, 4000)
            }
        }
    })
}

for ( let elBoton of downloadPDFbuttons) {
    elBoton.addEventListener("click", (e) => {
        // e.preventDefault()
        console.log(e.target)
        console.log(elBoton.id)
        for (let validation of validationTexts) {
            if (validation.id === elBoton.id) {
                validation.style.color = "mediumblue";
                validation.innerText = "Archivo PDF descargado con éxito"
                setTimeout(function() {
                    validation.innerText = " ";
                }, 4000)
            }
        }
    })
}

for ( let boton of deleteFileButtons) {
    boton.addEventListener("click", (e) => {
        console.log(e.target)
        console.log(boton.id)
        for (let validation of validationTexts) {
            if (validation.id === boton.id) {
                validation.style.color = "tomato";
                validation.innerText = "Borrando archivo PNG"
                setTimeout(function() {
                    validation.innerText = " ";
                }, 4000)
            }
        }
    })
}

