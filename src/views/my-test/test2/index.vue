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
      <!-- <span class="iconfont icon-aichegujiabeifen7"></span>
      <i class="iconfont icon-duanxinbao"></i>
      <span class="iconfont icon-dingdanguanli"></span>
      <span class="iconfont icon-weixiu"></span> -->
      <svg class="icon icon1" aria-hidden="true">
        <use xlink:href="#icon-aichegujiabeifen7"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-duanxinbao"></use>
      </svg>
      <svg class="icon icon3" aria-hidden="true">
        <use xlink:href="#icon-dingdanguanli"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-weixiu"></use>
      </svg>
      sabhshbshndnsdnzdmt
      <svg
        t="1657765292687"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2198"
        width="200"
        height="200"
      >
        <path
          d="M365.76 0h292.48q365.76 0 365.76 365.76v292.48Q1024 1024 658.24 1024H365.76Q0 1024 0 658.24V365.76Q0 0 365.76 0z"
          fill="#1afa29"
          p-id="2199"
        ></path>
        <path
          d="M428.32 568.48a25.92 25.92 0 0 1-3.04 8.96l-17.12 29.44h246.56a23.2 23.2 0 0 1 0 46.24H369.76a23.04 23.04 0 0 1-23.2-23.04 2.4 2.4 0 0 1 0-1.12 22.24 22.24 0 0 1 3.04-13.12l28-48-4.32-16a35.2 35.2 0 0 1-2.08-5.76l-41.28-154.08a25.44 25.44 0 0 1-0.96-6.08l-17.92-66.4L256.96 304a22.88 22.88 0 0 1-16-28.48 23.2 23.2 0 0 1 28-16l66.88 17.92a23.2 23.2 0 0 1 16 17.76 8.96 8.96 0 0 1 0 1.92L368.96 352.8h334.08A30.72 30.72 0 0 1 733.92 384a26.88 26.88 0 0 1-1.12 8l-41.12 153.6a31.04 31.04 0 0 1-29.76 22.88zM392.8 764.8a46.24 46.24 0 1 1 46.24-46.24 46.24 46.24 0 0 1-46.24 46.24z m250.4 0A46.24 46.24 0 1 1 688.96 718.56a46.24 46.24 0 0 1-45.76 46.24z"
          fill="#1296db"
          p-id="2200"
        ></path>
        <path
          d="M602.56 376.96m13.28 0l79.84 0q13.28 0 13.28 13.28l0 0.16q0 13.28-13.28 13.28l-79.84 0q-13.28 0-13.28-13.28l0-0.16q0-13.28 13.28-13.28Z"
          fill="#FFF6F0"
          p-id="2201"
        ></path>
      </svg>
      <!-- <One
        :char="char"
        :posi="posi"
        :message="message"
        :isShow="isShow"
        @chShow="changeShow"
      ></One> -->
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
      // this.message = this.input1;
      // this.isShow = true;
      this.showOne(this.input1, this.char, this.posi);
    },
    // changeShow() {
    //   this.isShow = false;
    // },
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
    .icon3 {
      width: 8em;
      height: 8em;
    }
  }
}
</style>