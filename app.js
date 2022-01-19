const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const io = require('socket.io-client')
const screenshot = require("screenshot-desktop")
const fs =  require('fs')
const socket = io('https://fathomless-island-54286.herokuapp.com/')

var win;
app.disableHardwareAcceleration()
const createWindow = () => {
      win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
      }
    })
    win.loadURL('file://'+ __dirname +'/public/src/index.html')
    win.removeMenu()
    win.openDevTools()
  }

/*Eventos de la ventana */
app.whenReady().then(() => {
  createWindow()
})


app.on('window-all-closed', function () {
  app.quit()
})

var base64;
/*eventos con HTML */
ipcMain.on("file:open",(event) =>{
  dialog.showOpenDialog({
    title:"Selecciona una imagen",
    properties:['openFile'],
    filters:[{
      name:'Imagenes',
      extensions:['jpg','png']
    }]
  }).then((result) => {
      base64 = fs.readFileSync(result.filePaths[0], 'base64') 
      // console.log(base64)
      event.reply("file:getfile",base64)
  })
})


ipcMain.on("evt:arch", (evt,img) =>{
  obj = {
    src: img
  }
  socket.emit('chat:file',obj)
})

ipcMain.on("click-apagar", () =>{
    console.log("click-apagar")
    socket.emit('tools:shutdown')
})

ipcMain.on("apagar-teclado", () =>{
  socket.emit("tools:teclado-apagar")
})

ipcMain.on("encender-teclado", () =>{
  socket.emit("tools:teclado-encender")
})

ipcMain.on("apagar-mouse", () =>{
  socket.emit("tools:mouse-apagar")
})

ipcMain.on("encender-mouse", () =>{
  socket.emit("tools:mouse-encender")
})

ipcMain.on("mensaje-normal", (evt,data) =>{
  socket.emit("chat:message", data)

})

var interval
ipcMain.on("screen:iniciar",() =>{
  interval = setInterval(function(){
    screenshot().then((img) =>{
      var imgStr = new Buffer.from(img).toString('base64')
      socket.emit("screen:share",imgStr);
    })
  },100)
})
ipcMain.on("screen:detener",() =>{
  clearInterval(interval)
})


//Compartir 
socket.on("chat:message",(data) =>{
  win.webContents.send("mensaje-normal",data)
})

socket.on("chat:file",(img) =>{
  win.webContents.send("mensaje-archivo",img.src)
})

socket.on("screen-data",(imgStr) =>{
  win.webContents.send("screen-data",(imgStr))
})

//Eventos de terminal 


socket.on("tools:shutdown",() =>{
  const exec = require('child_process').exec
  exec('shutdown -s -t 10')
  alert("Se apagara el equipo")
})

socket.on("tools:teclado-apagar",() =>{
  const exec = require('child_process').exec
  exec('apagar_teclado')
  alert("Se apago el teclado")
})

socket.on("tools:teclado-encender",() =>{
  const exec = require('child_process').exec
  exec('encender_teclado')
  alert("Se habilito el teclado")
})

socket.on("tools:mouse-apagar",() =>{
  const exec = require('child_process').exec
  exec('apagar_mouse')
  alert("Se apago el mouse")
})

socket.on("tools:mouse-encender",() =>{
  const exec = require('child_process').exec
  exec('encender_mouse')
  alert("Se habilito el mouse")
})
