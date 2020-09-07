
import './ui/app.js'
(($) => {
  const { ipcRenderer } = require('electron');
  // 動態載x-template資料
  ipcRenderer.send('template-send', '');
  ipcRenderer.on('template-reply', (event, arg) => {
    console.log(arg)
    const templates = JSON.parse(arg)
    templates.map(m => {
      $('#templates').load(m)
    })
  });

})($)