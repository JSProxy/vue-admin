// import '@babel/polyfill'; //兼容ie  es6 
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)
import { Button, Select } from 'element-ui'
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)

/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
