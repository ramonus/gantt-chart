// ./main.js
const {app, BrowserWindow, ipcMain} = require('electron');

let win = null;

ipcMain.on('pulse',(e,args) => {
  console.log("Closing...");
  win.close();
  process.exit(0);
});

function createWindow() {
  // Initialize the window to our specified dimensions
  win = new BrowserWindow({width: 1000, height: 600,show:false,frame:true,filscreen:true,darkTheme:false});
  win.something = "ramon";
  win.once("ready-to-show",() => {
    win.show();
  });

  // Specify entry point
  win.loadURL('http://localhost:3000');
  // Show dev tools
  // Remove this line before distributing
  win.webContents.openDevTools()

  // Remove window once app is closed
  win.on('closed', function () {
    win = null;
  });
}


app.on('ready', function () {

  createWindow();

});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
