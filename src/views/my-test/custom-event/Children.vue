<template>
  <div class="child">
    <el-row class="btn-list">
      <div class="btn"><el-button @click="submit0('默认按钮')">默认按钮（没有在父组件定义对应的方法）</el-button></div>
      <div class="btn"><el-button type="primary" @click="submit1('主要按钮')">主要按钮</el-button></div>
      <div class="btn"><el-button type="success" @click="submit2('成功按钮')">成功按钮</el-button></div>
      <div class="btn"><el-button type="info" @click="submit3('信息按钮')">信息按钮</el-button></div>
      <div class="btn"><el-button type="warning" @click="submit4('警告按钮')">警告按钮</el-button></div>
      <div class="btn"><el-button type="danger" @click="transferIn('submit5', '都有中转方法，且只能一次调用一个')">子组件和父组件都有中转方法</el-button></div>
      <div class="btn"><el-button @click="submit6('主要和成功都触发')">主要和成功都触发（一下子调用多个方法）</el-button></div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    submit0(val) {
      // this.$emit('submit1', val)
      this.$emit('toFather', {
        method: 'submit0',
        value: val
      })
    },
    submit1(val) {
      // this.$emit('submit1', val)
      this.$emit('toFather', {
        method: 'submit1',
        value: val
      })
    },
    submit2(val) {
      this.$emit('toFather', {
        method: 'submit2',
        value: val
      })
    },
    submit3(val) {
      this.$emit('toFather', {
        method: 'submit3',
        value: val
      })
    },
    submit4(val) {
      this.$emit('toFather', {
        method: 'submit4',
        value: val
      })
    },
    transferIn(method, value) {
      this.$emit('toFather', {
        method,
        value
      })
    },
    submit6(val) {
      this.$emit('toFather', {
        method: ['submit1', 'submit2'],
        value: {
          submit1: 'submit1我传入这个字符串',
          submit2: val
        }
      })
    }
    // submit6(val) {
    //   this.$emit('toFather', [
    //     {
    //       method: 'submit1',
    //       value: 'submit1我传入这个字符串'
    //     },
    //     {
    //       method: 'submit2',
    //       value: val
    //     }
    //   ])
    // }
  }
}
</script>

<style lang="less" scoped>
.child {
  .btn-list {
    .btn {
      margin-top: 10px;
    }
    //display: flex;
    //flex-direction: column;
    //justify-content: space-around;
  }
}
</style>
