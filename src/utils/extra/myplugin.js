// 在这个自定义的插件中，导出了一个类，里面定义了静态的install方法，还有init方法（执行时会进行一个自定义的组件的全局注册，也就是initComponents方法）
let _Vue = null
export default class MyPlugin {
  static install(Vue) { //install方法需要的参数是Vue的构造方法。调用该方法时会传递Vue的构造函数
    //首先判断插件是否已经被安装，如果已经被安装，就不需要重复安装。
    if (MyPlugin.install.installed) {    //1、判断当前插件是否已经被安装:
      return      //条件成立，表明插件已经被安装，什么都不要做。
    }
    MyPlugin.install.installed = true
    _Vue = Vue    //2、把Vue构造函数记录到全局变量中。
    _Vue.mixin({    //3、把创建Vue实例时候传入的router对象注入到Vue实例上。
      beforeCreate() {
        //在创建Vue实例时，即new Vue()的时候，才有$options这个属性，组件中是没有$options这个属性的。
        if (this.$options.myplugin) {
          _Vue.prototype.$myplugin = this.$options.myplugin
          this.$options.myplugin.init()     //调用init
          // console.log(this)
        }
      },
    })
  };
  constructor(options) {
    this.options = options
  }
  initComponents(Vue) {  //修改后的initComponents方法
    const self = this  //修改this的指向
    Vue.component("my-component", {
      data() {
        // name: JSON.parse(JSON.stringify(this.$myplugin.options))  //不能用这种方式，因为这时候Vue原型链上还没有$myplugin
        return {
          name: JSON.parse(JSON.stringify(self.options))
        }
      },
      render(h) {
        return h(
          "div",
          {
            attrs: {
              class: this.name && this.name[0],
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
          this.name.reverse()
        },
      },
    })
  }
  init() {  //进行组件的注册
    this.initComponents(_Vue)
  }
}

// 在main.js里：
// import Vue from "vue"
// import App from "./App.vue"
// import MyPlugin from "./Father.vue"  //这里导入的是自己定义的插件
// Vue.use(MyPlugin)
// const myplugin = new MyPlugin(['nameA', 'nameB'])
// new Vue({  //在main.js中完成路由的注册
//   myplugin,
//   render: (h) => h(App),
// }).$mount("#app")
//
//
// 在某个页面上的使用（使用注册的全局组件）
// <my-component>自定义组件里面的内容</my-component>
