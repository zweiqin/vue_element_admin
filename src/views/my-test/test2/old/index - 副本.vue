<template>
  <div class="main">
    <div class="left">
      <el-row>
        <div @click="sendChar('default')">
          <el-button type="primary">default</el-button>
        </div>
        <div @click="sendChar('warning')">
          <el-button type="warning">warning</el-button>
        </div>
        <div @click="sendChar('error')">
          <el-button type="danger">error</el-button>
        </div>
        <div @click="sendChar('success')">
          <el-button type="success">success</el-button>
        </div>
      </el-row>
      <el-row>
        <div @click="sendPosi('left')">
          <el-button type="info" icon="el-icon-back" circle></el-button>
        </div>
        <div @click="sendPosi('right')">
          <el-button type="info" icon="el-icon-right" circle></el-button>
        </div>
        <div @click="sendPosi('bottom')">
          <el-button type="info" icon="el-icon-bottom" circle></el-button>
        </div>
        <div @click="sendPosi('top')">
          <el-button type="info" icon="el-icon-top" circle></el-button>
        </div>
      </el-row>
      <div>
        <el-input placeholder="请输入通知消息" v-model="input1" clearable>
        </el-input>
        <!-- <el-input placeholder="请输入备注" v-model="input2" clearable>
        </el-input> -->
        <div @click="sendMsg">
          <el-button type="primary"
            >发送通知<i class="el-icon-upload el-icon--right"></i
          ></el-button>
        </div>
      </div>
    </div>
    <div class="right">
      <One
        :char="char"
        :posi="posi"
        :message="message"
        :isShow="isShow"
        @chShow="changeShow"
      ></One>
    </div>
  </div>
</template>

<script>
// import One from "./Oneone.vue";
export default {
  // components: {
  //   One,
  // },
  data() {
    return {
      char: "default",
      posi: "left",
      input1: "",
      // input2: "",
      message: "",
      isShow: false,
    };
  },
  methods: {
    sendChar(val) {
      this.char = val;
    },
    sendPosi(val) {
      this.posi = val;
    },
    sendMsg() {
      // this.message = { input1: this.input1, input1: this.input1 };
      this.message = this.input1;
      this.isShow = true;
    },
    changeShow() {
      this.isShow = false;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  height: 800px;
  display: flex;
  justify-content: space-between;
  background-color: #f4f5f5;
  padding: 0.7em 1em;
  .left {
    flex: 1;
    border-right: 2px solid red;
  }
  .right {
    flex: 4;
  }
}
</style>