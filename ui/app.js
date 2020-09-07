
import "./components/site.js";
import { router } from "./routes.js";
((document) => {

  new Vue({
    router
  }).$mount('#app');
  feather.replace();

})(document);