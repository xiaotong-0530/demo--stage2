import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import './styles/main.scss'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//导入css
// 消除浏览器默认css不一致


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
