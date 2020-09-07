
(async () => {

  // Modules to control application life and create native browser window
  const path = require('path')
  const isDev = require('electron-is-dev');
  const iconv = require('iconv-lite')
  const { app, BrowserWindow } = require('electron')
  const { ipcMain, ipcRenderer } = require('electron')

  var usb = require('usb')
  function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js')
      }
    })
    if (isDev) {
      mainWindow.webContents.openDevTools({ mode: 'undocked' })
    }
    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    // mainWindow.loadURL( format({
    //   pathname: join(__dirname, '/out/index.html'),
    //   protocol: 'file:',
    //   slashes: true
    // }))
    //`file://${__dirname}/out/index.html`

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
    mainWindow.maximize()
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })



  ipcMain.on('device-info-send', (event, arg) => {
    if (arg === 'usb') {
      event.reply('device-info-reply', JSON.stringify(usb.getDeviceList()))
    }
  })

  usb.on('attach', function (device) {
    console.log(device)
  });

  const smartcard = require('smartcard');
  const Devices = smartcard.Devices;
  const Iso7816Application = smartcard.Iso7816Application;
  const CommandApdu = smartcard.CommandApdu;
  const devices = new Devices();
  devices.on('device-activated', event => {
    const currentDevices = event.devices;
    let device = event.device;
    for (let prop in currentDevices) {
    }


    device.on('card-inserted', event => {
      let card = event.card;
      console.log(`Card '${card.getAtr()}' inserted into '${event.device}'`);

      card.on('command-issued', event => {
      });

      card.on('response-received', event => {
      });

      const application = new Iso7816Application(card);
      application.issueCommand(new CommandApdu({ bytes: [0x00, 0xA4, 0x04, 0x00, 0x10, 0xD1, 0x58, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x11, 0x00] }))
        .then((response) => {
          // console.log(`${response}`);
          console.log(response.toString())
        }).catch((error) => {
          console.error(error);
        });
      application
        .issueCommand(Buffer.from([0x00, 0xca, 0x11, 0x00, 0x02, 0x00, 0x00]))
        .then((response) => {
          console.log(response.toString())
          const s1 = response.toString().substr(0, 23)
          const s2 = response.toString().substr(24, 23)
          const s3 = response.toString().substring(64, response.toString().length)
          const s32 = Buffer(s3.substring(0, s3.length - 3).toString(), 'hex').toString();
          const data = {
            cardNumber: Buffer(s1, 'hex').toString(),
            name: iconv.decode(Buffer.from(s2, 'hex'), 'big5').trim().replace(/(^　*)|(　*$)/g, ""),
            idNumber: s32.substr(0, 9),
            birthday: s32.substr(10, 7),
            sex: s32.substr(17, 1),
            publish: s32.substr(18)
          }
          ipcMain.on('nhi-card-send', (event, arg) => {
            console.log(arg)
            console.log(data)
            if (arg === 'ok') {
              event.reply('nhi-card-reply', JSON.stringify(data))
            }
          })

        }).catch((error) => {
          console.error(error);
        });

    });
    device.on('card-removed', event => {
      console.log(`Card removed from '${event.name}' `);
    });
  });
  devices.on('device-deactivated', event => {
    console.log(`Device '${event.device}' deactivated, devices: [${event.devices}]`);
  });
  const glob = require("glob-promise")
  const templateFiles = await glob('./ui/**/*.html')
  ipcMain.on('template-send', (event, arg) => {
    event.reply('template-reply', JSON.stringify(templateFiles))
  })
})()

