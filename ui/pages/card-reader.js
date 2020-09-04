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
    template: `<div class="card">
    <div class="card-header">
    讀取健保卡資料
    </div>
    <div class="card-body">
      <div class="input-group input-group-lg mb-3">
        <span class="input-group-text" id="card-number">卡號</span>
        <input type="text" class="form-control"  aria-describedby="card-number" disabled  v-model="cardData.cardNumber">
      </div>
      <div class="input-group input-group-lg mb-3">
        <span class="input-group-text" id="user-name">姓名</span>
        <input type="text" class="form-control"  aria-describedby="user-name" disabled  v-model="cardData.name">
      </div>
      <div class="input-group input-group-lg mb-3">
        <span class="input-group-text" id="idNumber">身份證號碼</span>
        <input type="text" class="form-control"  aria-describedby="idNumber" disabled  v-model="cardData.idNumber">
      </div>
      <div class="input-group input-group-lg mb-3">
        <span class="input-group-text" id="birthday">生日</span>
        <input type="text" class="form-control"  aria-describedby="birthday" disabled  v-model="cardData.birthday">
      </div>
      <div class="input-group input-group-lg mb-3">
        <span class="input-group-text" id="sex">性別</span>
        <input type="text" class="form-control"  aria-describedby="sex" disabled  v-model="cardData.sex">
      </div>
      <div class="input-group input-group-lg mb-3">
        <span class="input-group-text" id="publish">發卡日</span>
        <input type="text" class="form-control"  aria-describedby="publish" disabled  v-model="cardData.publish">
      </div>                        
      <button class="btn btn-primary mb-3" type='button' @click="startReading">開始讀取</button>
    </div>
  </div>`
})