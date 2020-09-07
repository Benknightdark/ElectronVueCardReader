import {isLogin} from  './helpers/ahtuHelper.js'
import "./components/site.js";
import { router } from "./routes.js";
((document) => {

  new Vue({
    el: '#app',
    router,
    created:function(){
      console.log(isLogin())
    }
  })//.$mount('#app');
  feather.replace();

})(document);