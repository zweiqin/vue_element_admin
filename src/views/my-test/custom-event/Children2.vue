<template>
  <div class="child">
    <el-row class="btn-list">
      <div class="btn"><el-button>默认按钮</el-button></div>
      <div class="btn"><el-button type="primary" @click="submit1('主要按钮')">主要按钮</el-button></div>
      <div class="btn"><el-button type="success" @click="submit2('成功按钮')">成功按钮</el-button></div>
      <div class="btn"><el-button type="info" @click="submit3('信息按钮')">信息按钮</el-button></div>
      <div class="btn"><el-button type="warning" @click="submit4('警告按钮')">警告按钮</el-button></div>
      <div class="btn"><el-button type="danger" @click="submit5('危险按钮')">危险按钮</el-button></div>
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
    submit1(val) {
      this.$emit('toFather1', val)
    },
    submit2(val) {
      this.$emit('toFather2', val)
    },
    submit3(val) {
      this.$emit('toFather3', val)
    },
    submit4(val) {
      this.$emit('toFather4', val)
    },
    submit5(val) {
      this.$emit('toFather5', val)
    }
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
