const { ipcRenderer } = require('electron');

export const cardReaderComponent = Vue.component('card-reader', {
    created: function () {
        $('#page-header-id').text('讀卡機');
        ipcRenderer.removeAllListeners();
        ipcRenderer.on('nhi-card-reply', (event, arg) => {
            const data = JSON.parse(arg);
            let newName = '';

            data['name'].split('').map(element => {
                console.log();
                if (element.charCodeAt(0) !== 0) {
                    newName += element;
                }
            });
            data['name'] = newName;
            console.log(data);
            this.cardData=data
        });

    },
    data: function () {
        return {
            cardData:{}
        }
    },
    methods: {
      startReading:function(){
        ipcRenderer.send('nhi-card-send', 'ok');

      }
    },
    template: `#card-reader-template`
})