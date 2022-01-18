const { ipcRenderer } = require('electron')

const btnApagar = document.getElementById("apagar")

btnApagar.addEventListener("click", () =>{
    console.log("apagar btn")
    ipcRenderer.send("click-apagar")
})

