
import compute from './bc'
let _Vue = null
export default class BC {
    static install(Vue) { //install方法需要的参数是Vue的构造方法。调用该方法时会传递Vue的构造函数
        //首先判断插件是否已经被安装，如果已经被安装，就不需要重复安装。   
        if (BC.install.installed) {    //1、判断当前插件是否已经被安装:  
            return      //条件成立，表明插件已经被安装，什么都不要做。
        }
        BC.install.installed = true
        _Vue = Vue    //2、把Vue构造函数记录到全局变量中。
        _Vue.prototype.$compute = compute
        // console.log(_Vue.prototype)
        // _Vue.mixin({    //3、把创建Vue实例时候传入的router对象注入到Vue实例上。
        //     beforeCreate() {
        //         //在创建Vue实例时，即new Vue()的时候，才有$options这个属性，组件中是没有$options这个属性的。
        //         if (this.$options.router) {
        //             _Vue.prototype.$router = this.$options.router
        //             this.$options.router.init()     //调用init
        //         }
        //     },
        // })
        // this.$compute(996).add(997)
    }
}
