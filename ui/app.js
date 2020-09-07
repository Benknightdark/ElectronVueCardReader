import "./components/site.js";
import { router } from "./routes.js";
((document) => {

  new Vue({
    el: '#app',
    router,
    created:function(){
    }
  })//.$mount('#app');
  feather.replace();

})(document);