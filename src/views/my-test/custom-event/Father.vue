<template>
  <div class="main">
    <div class="father">
      <div class="msg">案例一子组件传递过来的数据：{{ msg }}</div>
      <div class="msg">案例二子组件传递过来的数据：{{ notice }}</div>
      <div class="children">
        案例一children
        <Children @toFather="transferOut($event)"></Children>
      </div>
      <div class="children2">
        案例二children2
        <Children2
          @toFather1="transfer2($event, 'refer1')"
          @toFather2="transfer2($event, 'refer2')"
          @toFather3="transfer2($event, 'refer3')"
          @toFather4="transfer2($event, 'refer4')"
          @toFather5="transfer2($event, 'refer5')"></Children2>
      </div>
    </div>
  </div>
</template>

<script>
import Children from './Children.vue'
import Children2 from './Children2.vue'
export default {
  components: {
    Children,
    Children2
  },
  data() {
    return {
      msg: '案例一还没有传',
      notice: '案例二还没有传'
    }
  },
  methods: {
    // children的中转
    // transfer(obj) {
    //   // console.log(this)
    //   console.log(obj)
    //   const toString = Object.prototype.toString
    //   const map = {
    //     '[object Boolean]': 'boolean',
    //     '[object Number]': 'number',
    //     '[object String]': 'string',
    //     '[object Function]': 'function',
    //     '[object Array]': 'array',
    //     '[object Date]': 'date',
    //     '[object RegExp]': 'regExp',
    //     '[object Undefined]': 'undefined',
    //     '[object Null]': 'null',
    //     '[object Object]': 'object'
    //   }
    //   console.log(map[toString.call(obj)])
    //   if (map[toString.call(obj.method)] === 'array') {
    //     if (map[toString.call(obj.value)] === 'object') {
    //       obj.method.forEach((item) => {
    //         let temp
    //         if (item in obj.value) {
    //           temp = obj.value[item]
    //         }
    //         this[item](temp)
    //       })
    //     } else {
    //       obj.method.forEach((item) => {
    //         this[item](obj.value)
    //       })
    //     }
    //   } else if (map[toString.call(obj.method)] === 'string') {
    //     this[obj.method](obj.value)
    //   } else {
    //     console.log(new Error(`还没有在父组件的methods对象中定义 ${obj.method} 方法`))
    //   }
    // },
    // transferOut(e) {
    //   !this[e.method] ? console.error(new Error(`还没有在父组件的methods对象中定义 ${e.method} 方法`)) : ''
    //   this[e.method](e.value)
    // },
    transferOut(e) {
      if (!this[e.method]) {
        console.error(`还没有在父组件的methods对象中定义 ${e.method} 方法`)
      } else {
        this[e.method](e.value)
      }
    },
    submit1(value) {
      console.log('触发了submit1方法')
      this.msg = value
    },
    submit2(value) {
      console.log('触发了submit2方法')
      this.msg = value
    },
    submit3(value) {
      console.log('触发了submit3方法')
      this.msg = value
    },
    submit4(value) {
      console.log('触发了submit4方法')
      this.msg = value
    },
    submit5(value) {
      console.log('触发了submit5方法')
      this.msg = value
    },

    // children2的中转
    transfer2(value, method) {
      console.log(value, method)
      this[method](value)
    },
    refer1(value) {
      this.notice = value
    },
    refer2(value) {
      this.notice = value
    },
    refer3(value) {
      this.notice = value
    },
    refer4(value) {
      this.notice = value
    },
    refer5(value) {
      this.notice = value
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  height: 800px;
  background-color: #f4f5f5;
  padding: 0.7em 1em;
  .father {
    height: 100%;
    border: 2px solid green;
    .msg {
      margin-bottom: 30px;
    }
    .children {
      width: 60%;
      height: 45%;
      margin: 0 auto;
      border: 2px solid red;
    }
    .children2 {
      width: 60%;
      height: 40%;
      margin: 0 auto;
      border: 2px solid red;
    }
  }
}
</style>
