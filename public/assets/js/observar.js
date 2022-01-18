const { ipcRenderer} = require('electron')
const imagen = document.getElementById("screen")


ipcRenderer.on("screen-data",(evt,img) => {
    imagen.setAttribute("src","data:image/png;base64,"+img)
})