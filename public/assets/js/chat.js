const { ipcRenderer } = require('electron')
// declarando componentes del DOM
const contenedor_chat = document.getElementById("chat")
const btnEnviar = document.getElementById("enviar")
const btnArchivos = document.getElementById("documentos")
const txtMensaje = document.getElementById("mensaje")
var normal = true;
var archivo = null;
// Eventos
btnEnviar.addEventListener("click", () =>{
    if (normal){
        var datos = {mensaje: txtMensaje.value}
        txtMensaje.value = null
        ipcRenderer.send("mensaje-normal",datos)
    }else{
        normal = true;
        if (!(archivo == null)){
            ipcRenderer.send("evt:arch",archivo)
        }
    }
})
btnArchivos.addEventListener("click", () =>{
    ipcRenderer.send('file:open')
})


ipcRenderer.on("mensaje-normal",(evt,data) => {
    // console.log(data)
    contenedor_chat.innerHTML += '<p class="recibido"><strong>mensaje:</strong> '+ data.mensaje +'</p>'
})

ipcRenderer.on("file:getfile",(evt,file) => {
    // console.log("si")
    //Es una imagen lo que recibe
    alert("Presiona Enviar para compartir el archivo")
    normal = false
    archivo = file
})

ipcRenderer.on("mensaje-archivo",(evt,base64) => {
    // console.log(base64)
    contenedor_chat.innerHTML += `<a href="data:image/png;base64,${base64.toString()}" download><img class="img-recibido" src="data:image/png;base64,${base64.toString()}"/></a>`
})


