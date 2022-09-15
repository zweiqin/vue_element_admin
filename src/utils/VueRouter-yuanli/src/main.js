
import Vue from "vue"
import App from "./App.vue"
//导入router.js
import router from "./router"
Vue.config.productionTip = false
new Vue({  //在main.js中完成路由的注册
    router,
    render: (h) => h(App),
}).$mount("#app")
