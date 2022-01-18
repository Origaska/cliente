const { ipcRenderer } = require('electron')


// definiendo los datos del DOM 
const btnTeclado = document.getElementById("teclado");
const btnMouse = document.getElementById("mouse");

var estadoTeclado = true;
var estadoMouse = true;

btnTeclado.addEventListener("click",() => {
    if (estadoTeclado){
        ipcRenderer.send("apagar-teclado");
        console.log("desactivar")
        btnTeclado.innerText = "Desbloquear Teclado";
        estadoTeclado = false;
    }else{
        ipcRenderer.send("encender-teclado");
        console.log("activar")
        btnTeclado.innerText = "Bloquear Teclado";
        estadoTeclado = true;
    }
})
btnMouse.addEventListener("click",() => {
    if (estadoMouse){
        ipcRenderer.send("apagar-mouse");
        btnMouse.innerHTML = "Desbloquear Mouse";
        estadoMouse = false;
    }else{
        ipcRenderer.send("encender-mouse");
        btnMouse.innerHTML = "Bloquear Mouse";
        estadoMouse = true;
    }
})