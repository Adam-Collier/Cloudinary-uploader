var menubar = require("menubar");

// Enable live reload for all the files inside your project directory
require("electron-reload")(__dirname);

var mb = menubar({
  width: 400,
  height: 250,
  windowPosition: "trayLeft",
  backgroundColor: "#24292e",
  icon: "./icon/icon.png"
});

mb.on("ready", function ready() {
  this.tray.on("right-click", function() {
    mb.app.quit();
  });
  console.log("app is ready");
  // your app code here
});
