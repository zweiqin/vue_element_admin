<template>
  <div class="user">
    <div class="center">
      <div>
        <i
          class="el-icon-s-custom"
          style="font-size: 4em; margin: 0px auto"
        ></i>
      </div>
      <div style="margin-top: 0.5em">张小姐</div>
    </div>
    <div class="empty"></div>
    <div class="tablist">
      <div class="inside">
        <div class="message">
          <div class="message-inside" @click="shutone">
            <span>客户信息</span
            ><i
              class="el-collapse-item__arrow el-icon-arrow-right"
              :class="isShow ? 'is-active' : ''"
            />
          </div>
        </div>
        <div class="tabpanel" :class="!isShow ? 'is-active' : ''">
          <div class="tabpanel-inside">
            <!-- :style="{ display: oneShow }" -->
            <div class="person-detail">
              <div
                class="item_info"
                v-for="(item, index) in message"
                :key="index"
              >
                <div>{{ item[0] }}</div>
                <div>{{ item[1] }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      message: this.user,
      oneShow: "block",
      isShow: true,
    };
  },
  mounted() {
    // console.log(this.user);
  },
  methods: {
    shutone() {
      this.oneShow == "block"
        ? (this.oneShow = "none")
        : (this.oneShow = "block");
      this.isShow ? (this.isShow = false) : (this.isShow = true);
    },
  },
};
</script>

<style lang="less" scoped>
.user {
  width: 98%;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto 1.5em;
  padding: 1em 1em;
  .center {
    width: 100%;
    height: 100px;
    position: relative;
    text-align: center;
  }
  .empty {
    display: block;
    height: 1px;
    width: 100%;
    margin: 0 0 20px 0;
    background-color: #dcdfe6;
    position: relative;
  }
  .tablist {
    border-top: 1px solid #e6ebf5;
    border-bottom: 1px solid #e6ebf5;
    .inside {
      margin-bottom: -1px;
      .message {
        .message-inside {
          display: flex;
          justify-content: space-between;
          border-bottom-color: transparent;
          align-items: center;
          height: 48px;
          line-height: 48px;
          background-color: #ffffff;
          color: #303133;
          cursor: pointer;
          border-bottom: 1px solid #e6ebf5;
          font-size: 13px;
          font-weight: 500;
          transition: border-bottom-color 0.3s;
          outline: none;
          .el-collapse-item__arrow.is-active {
            transform: rotate(90deg);
          }
          .el-collapse-item__arrow {
            transition: transform 0.3s, -webkit-transform 0.3s;
          }
          i {
            margin-right: 10px;
          }
        }
      }
      .tabpanel {
        height: 336px;
        will-change: height;
        background-color: #ffffff;
        overflow: hidden;
        box-sizing: border-box;
        border-bottom: 1px solid #e6ebf5;
        transition: height 0.5s;
        -webkit-transition: height 0.5s;
        .tabpanel-inside {
          padding-bottom: 25px;
          font-size: 13px;
          color: #303133;
          line-height: 1.7692307692;
          .person-detail {
            .item_info {
              display: flex;
              -webkit-box-orient: horizontal;
              -webkit-box-direction: normal;
              flex-direction: row;
              -webkit-box-pack: justify;
              justify-content: space-between;
              font-size: 14px;
              margin-bottom: 1em;
            }
          }
        }
      }
      .tabpanel.is-active {
        height: 0;
      }
    }
  }
}
</style>