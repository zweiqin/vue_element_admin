
let _Vue = null
export default class VueRouter {
    static install(Vue) { //install方法需要的参数是Vue的构造方法。调用该方法时会传递Vue的构造函数
        //首先判断插件是否已经被安装，如果已经被安装，就不需要重复安装。   
        if (VueRouter.install.installed) {    //1、判断当前插件是否已经被安装:  
            return      //条件成立，表明插件已经被安装，什么都不要做。
        }
        VueRouter.install.installed = true
        _Vue = Vue    //2、把Vue构造函数记录到全局变量中。
        _Vue.mixin({    //3、把创建Vue实例时候传入的router对象注入到Vue实例上。
            beforeCreate() {
                //在创建Vue实例时，即new Vue()的时候，才有$options这个属性，组件中是没有$options这个属性的。
                if (this.$options.router) {
                    _Vue.prototype.$router = this.$options.router
                    this.$options.router.init()     //调用init
                }
            },
        })
    };
    constructor(options) {
        this.options = options
        this.routeMap = {}
        this.data = _Vue.observable({
            current: "/",
        })
    }
    createRouteMap() {
        this.options.routes.forEach((route) => {
            this.routeMap[route.path] = route.component
        })
    }
    initComponents(Vue) {  //修改后的initComponents方法
        Vue.component("router-link", {
            props: {
                to: String,
            },
            render(h) {
                return h(
                    "a",
                    {
                        attrs: {
                            href: this.to,
                        },
                        on: {
                            click: this.clickHandler,
                        },
                    },
                    [this.$slots.default]
                )
            },
            methods: {
                clickHandler(e) {
                    history.pushState({}, "", this.to)
                    this.$router.data.current = this.to
                    e.preventDefault()    //阻止默认行为，阻止刷新后向服务器发请求
                },
            },
        })
        const self = this  //修改this的指向
        Vue.component("router-view", {  //在initComponents方法中创建router-view组件
            render(h) {        //根据当前的路径从routeMap中查找对应的组件
                const component = self.routeMap[self.data.current]
                return h(component)     //将组件转换成虚拟dom
            },
        })
    }
    initEvent() {
        window.addEventListener("popstate", () => {
            this.data.current = window.location.pathname
        })
    }
    init() {  //进行测试
        this.createRouteMap()
        this.initComponents(_Vue)
        this.initEvent()
    }
}

