
import   "./components/site.js";
import { cardReaderComponent } from "./pages/card-reader.js";
((document) => {
  const Foo = Vue.component('Foo', {
    created: function () {
      document.title = 'Foo';
      // ipcRenderer.removeAllListeners()
      ipcRenderer.on('device-info-reply', (event, arg) => {
        this.data = JSON.parse(arg);
        console.log(this.data);
      });
    },
    data: function () {
      return {
        data: []
      };
    }, template: `<div>
                <ul class="list-group">
                  <li class="list-group-item" v-for="item in data" :key="item.deviceAddress">{{ item.busNumber }} - {{ item.deviceAddress }}</li>
              </ul>
          </div>`
  });


  const Bar = Vue.component('Bar', {
    created: async function () {
      try {
        document.title = 'Bar';
        const fetchData = await fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/E-A0015-001?Authorization=rdec-key-123-45678-011121314');
        const resData = await fetchData.json();
        console.log(resData);
        this.description = resData.records.datasetDescription;
      } catch (error) {
        console.error(error);
      }

    },
    data: function () {
      return {
        description: ''
      };
    },

    template: '<div>{{description}}</div>'
  });
  const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    {path:'/car-reader',component:cardReaderComponent}
  ];

  const router = new VueRouter({
    routes // short for `routes: routes`
  });

  Vue.component('button-counter', {
    data: function () {
      return {
        count: 0
      };
    },
    methods: {
      say: function (message) {
        alert(message);

      }
    },
    template: `<button v-on:click="say('usb')">get usb list</button>`
  });
  new Vue({
    router
  }).$mount('#app');
  feather.replace(); 
 
})(document);