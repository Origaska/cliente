const { ipcRenderer} = require('electron')
const btnIniciar = document.getElementById("iniciar")
const btnDetener = document.getElementById("detener")


btnIniciar.addEventListener("click",()=>{
    ipcRenderer.send("screen:iniciar");
})

btnDetener.addEventListener("click",()=>{
    ipcRenderer.send("screen:detener");
})

