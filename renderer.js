import './ui/app.js'

(($) => {
  const { ipcRenderer } = require('electron');
  // 動態載x-template資料
  ipcRenderer.send('template-send', '');
  ipcRenderer.on('template-reply', (event, arg) => {
    console.log(arg)
    const templates = JSON.parse(arg)
    for (let index = 0; index < templates.length; index++) {
      const element = templates[index];

       $('#templates').append(`<div id='t-${index}'></div>`)
       $(`#t-${index}`).load(element)
    }
   
  });

})($)

