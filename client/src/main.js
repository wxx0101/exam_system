import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./config/element-ui"
import mavonEditor from 'mavon-editor'
import 'element-ui/lib/theme-chalk/index.css'
import 'mavon-editor/dist/css/index.css'
import store from "./store/index"

Vue.config.productionTip = false

Vue.use(mavonEditor)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
