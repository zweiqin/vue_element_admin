
import Vue from "vue"
import Router from "./vuerouter"  //这里导入的是自己定义的路由规则
import Login from "./components/Login.vue"
import Home from "./components/Home.vue"
Vue.use(Router)
export default new Router({
    model: "history",  //虽然这个案例写这个没什么用
    routes: [
        { path: "/", component: Home },
        { path: "/login", component: Login },
    ],
})
