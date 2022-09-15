<template>
  <div class="child">
    <div class="center">
      <div class="outside" v-if="isShow">
        <div class="inside">
          <div class="tip" :class="classObj">
            <div class="inner" :class="disappear">
              <div :class="innerColor">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>通知组件</span>
                  </div>
                  <div class="text item">
                    {{ "通知内容：" + message }}
                  </div>
                  <div>
                    <i
                      :class="iconName"
                      style="font-size: 4em; margin: 0px auto"
                    ></i>
                  </div>
                </el-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="empty"></div>
    <div class="tablist">
      <div class="inside"></div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    char: {
      default: "default",
      type: String,
    },
    posi: {
      type: String,
      default: "left",
      // require: true,
    },
    message: {
      type: String,
      default: "通知内容",
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      classObj: {
        posileft: true,
        posiright: false,
        posibottom: false,
        positop: false,
      },
      disappear: "",
      innerColor: {
        default: true,
        warning: false,
        error: false,
        success: false,
      },
      // iconName: "el-icon-caret-left",
    };
  },
  watch: {
    char(newV, oldV) {
      const innerColor = this.innerColor;
      for (let i in innerColor) {
        innerColor[i] = false;
        // classObj.posileft = true;
      }
      innerColor[newV] = true;
    },
    posi(newV, oldV) {
      const classObj = this.classObj;
      for (let i in classObj) {
        classObj[i] = false;
        // classObj.default = true;
      }
      classObj["posi" + newV] = true;
    },
    isShow(newV, oldV) {
      if (newV) {
        // this.$nextTick(() => {
        // this.disappear = "";
        setTimeout(() => {
          this.disappear = "disa";
          setTimeout(() => {
            this.disappear = "";
            this.$emit("chShow", false);
          }, 1000);
        }, 1000);
        // });
      }
    },
    // classObj: {
    //   deep: true,
    //   handler(newV) {
    //     newV.posileft == true
    //       ? this.iconName == "el-icon-caret-left"
    //       : newV.posiright == true
    //       ? this.iconName == "el-icon-caret-right"
    //       : newV.posibottom == true
    //       ? this.iconName == "el-icon-caret-bottom"
    //       : this.iconName == "el-icon-caret-top";
    //   },
    // },
  },
  computed: {
    iconName() {
      if (this.classObj.posileft) {
        return "el-icon-caret-left";
      } else if (this.classObj.posiright) {
        return "el-icon-caret-right";
      } else if (this.classObj.posibottom) {
        return "el-icon-caret-bottom";
      } else if (this.classObj.positop) {
        return "el-icon-caret-top";
      }
    },
  },
  mounted() {
    // console.log(this.user);
    // this.$nextTick(() => {
    const body = document.querySelector("body");
    const matchDom = document.querySelector(".child");
    // 将匹配DOM添加到body中
    if (body.append) {
      // 在IE11中 document.appendChild会报错: javascript runtime error:HierarchyRequestError
      body.append(matchDom);
    } else {
      body.appendChild(matchDom);
    }
    // });
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.child {
  // position: absolute;
  // top: 0;
  // left: 0;
  // width: 100%;
  // height: 100%;
  // z-index: 0;
  // background-color: white;
  // border-radius: 5px;
  // margin: 0 auto;
  // padding: 1em 1em;
  .center {
    // width: 100%;
    // height: 100%;
    // position: absolute;
    // top: 0;
    // left: 0;
    // position: relative;
    // text-align: center;
    .outside {
      // width: 100%;
      // height: 100%;
      .inside {
        // position: absolute;
        // top: 0;
        // left: 0;
        // content: "";
        // display: block;
        // clear: both;
        // overflow: hidden;
        // width: 100%;
        // height: 100%;
        // transition: transform 1s, opacity 1s;
        // transform: translateY(-50vh);
        // z-index: 99999;
        .tip {
          width: 480px;
          position: absolute;
          z-index: 9999;
          // top: -20% !important;
          // transform: translateY(-70%) !important;
          .disa {
            transform: translateY(-10%);
            opacity: 0.05;
          }
          .inner {
            transition: transform 1s, opacity 1s;
            .default {
              color: #ffffff;
              background-color: #1890ff;
              border-color: #1890ff;
            }
            .warning {
              color: #ffffff;
              background-color: #ffba00;
              border-color: #ffba00;
            }
            .error {
              color: #ffffff;
              background-color: #ff4949;
              border-color: #ff4949;
            }
            .success {
              color: #ffffff;
              background-color: #13ce66;
              border-color: #13ce66;
            }
          }
          .el-card {
            background-color: transparent;
            color: #ffffff;
          }
          .text {
            font-size: 14px;
          }

          .item {
            margin-bottom: 18px;
          }

          .clearfix:before,
          .clearfix:after {
            display: table;
            content: "";
          }
          .clearfix:after {
            clear: both;
          }

          .box-card {
            width: 480px;
          }
        }
        .posileft {
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
        .posiright {
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
        .posibottom {
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
        }
        .positop {
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
  // .empty {
  // display: block;
  // height: 1px;
  // width: 100%;
  // margin: 0 0 20px 0;
  // background-color: #dcdfe6;
  // position: relative;
  // }
  // .tablist {
  // border-top: 1px solid #e6ebf5;
  // border-bottom: 1px solid #e6ebf5;
  // .inside {
  // margin-bottom: -1px;
  // }
  // }
}
</style>