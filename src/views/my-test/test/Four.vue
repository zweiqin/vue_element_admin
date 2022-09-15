<template>
  <div class="log_message">
    <div class="el-tabs el-tabs--top">
      <div class="el-tabs__header is-top">
        <div class="el-tabs__nav-wrap is-top">
          <div class="el-tabs__nav-scroll">
            <div
              role="tablist"
              class="el-tabs__nav is-top"
              style="transform: translateX(0px)"
            >
              <div
                class="el-tabs__active-bar is-top"
                style="width: 56px; transform: translateX(0px)"
                ref="myRef"
              ></div>
              <div
                id="tab-first"
                aria-controls="pane-first"
                role="tab"
                tabindex="0"
                class="el-tabs__item is-top"
                :class="isShow == 1 ? 'is-active' : ''"
                aria-selected="true"
                @click="show(1)"
              >
                服务日志
              </div>
              <div
                id="tab-second"
                aria-controls="pane-second"
                role="tab"
                tabindex="-1"
                class="el-tabs__item is-top"
                :class="isShow == 2 ? 'is-active' : ''"
                @click="show(2)"
              >
                消费记录
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="el-tabs__content">
        <div
          role="tabpanel"
          id="pane-first"
          aria-labelledby="tab-first"
          class="el-tab-pane"
          :style="{ display: serve }"
        >
          <div class="service_container">
            <div class="service_content">
              <div class="timeline">
                <ul class="el-timeline is-reverse" style="padding-left: 0px">
                  <li class="el-timeline-item">
                    <div class="el-timeline-item__tail"></div>
                    <div
                      class="
                        el-timeline-item__node
                        el-timeline-item__node--normal
                        el-timeline-item__node--
                      "
                    >
                      <!---->
                    </div>
                    <!---->
                    <div class="el-timeline-item__wrapper">
                      <!---->
                      <div class="el-timeline-item__content">
                        <div class="service_content_item" style="display: flex">
                          <span
                            >服务门店：北京路店 <br />
                            2022-03-10 21:26:54 </span
                          ><span
                            ><span
                              >服务项目：
                              <div>
                                <span>日之泉|日式温泉舒缓SPA</span>
                              </div>
                              <div>
                                <span>日之泉|日式温泉舒缓SPA</span>
                              </div></span
                            ><!----></span
                          ><span
                            ><span
                              >服务人员：
                              <div>
                                <span>06金喜凤</span>
                              </div>
                              <div>
                                <span>03号蔡贝</span>
                              </div></span
                            ><!----></span
                          >
                        </div>
                      </div>
                      <div class="el-timeline-item__timestamp is-bottom"></div>
                    </div>
                  </li>
                  <li class="el-timeline-item">
                    <div class="el-timeline-item__tail"></div>
                    <div
                      class="
                        el-timeline-item__node
                        el-timeline-item__node--normal
                        el-timeline-item__node--
                      "
                    >
                      <!---->
                    </div>
                    <!---->
                    <div class="el-timeline-item__wrapper">
                      <!---->
                      <div class="el-timeline-item__content">
                        <div class="service_content_item" style="display: flex">
                          <span
                            >服务门店：北京路店 <br />
                            2022-03-20 18:42:09 </span
                          ><span
                            ><span
                              >服务项目：
                              <div>
                                <span>全身精油经络SPA-60</span>
                              </div></span
                            ><!----></span
                          ><span
                            ><span
                              >服务人员：
                              <div>
                                <span>05号石云英</span>
                              </div></span
                            ><!----></span
                          >
                        </div>
                      </div>
                      <div class="el-timeline-item__timestamp is-bottom"></div>
                    </div>
                  </li>
                </ul>
                <div class="el-divider el-divider--horizontal">
                  <!---->
                </div>
                <div class="page">
                  <div class="el-pagination">
                    <span class="el-pagination__total">共 2 条</span
                    ><button type="button" disabled="disabled" class="btn-prev">
                      <i class="el-icon el-icon-arrow-left"></i>
                    </button>
                    <ul class="el-pager">
                      <li class="number active">1</li>
                      <!----><!----><!---->
                    </ul>
                    <button type="button" disabled="disabled" class="btn-next">
                      <i class="el-icon el-icon-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          role="tabpanel"
          id="pane-second"
          aria-labelledby="tab-second"
          class="el-tab-pane"
          :style="{ display: consume }"
          aria-hidden="true"
        >
          <div class="consume_container">
            <div class="header" style="display: flex; flex-direction: row">
              <div style="margin-bottom: 10px" @click="change()">
                <el-radio-group v-model="radio3" size="small">
                  <el-radio-button label="开单记录"></el-radio-button>
                  <el-radio-button label="开卡记录"></el-radio-button>
                </el-radio-group>
              </div>
              <div class="block">
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="small"
                  style="margin-left: 1em"
                >
                </el-date-picker>
              </div>
            </div>
            <div>
              <div class="consume_data_table">
                <div class="all">
                  <div class="consume_table">
                    <div class="consume_table_head">
                      <div
                        class="consume_table_head_item1"
                        style="width: 100px; padding-left: 17px"
                      >
                        类型
                      </div>
                      <div
                        class="consume_table_head_item2"
                        style="width: 180px; flex-grow: 1"
                      >
                        消费
                      </div>
                      <div
                        class="consume_table_head_item3"
                        style="width: 150px; flex-grow: 1"
                      >
                        卡充值内容
                      </div>
                      <div
                        class="consume_table_head_item4"
                        style="width: 120px"
                      >
                        付款
                      </div>
                      <div
                        class="consume_table_head_item5"
                        style="width: 97px; flex-grow: 1; word-break: break-all"
                      >
                        服务顾问
                      </div>
                      <div
                        class="consume_table_head_item6"
                        style="width: 80px; padding-right: 17px"
                      ></div>
                    </div>
                    <div class="consume_table_body">
                      <div
                        class="cosume_table_body_item"
                        v-for="(item, index) in real"
                        :key="index"
                      >
                        <div class="consume_table_body_item_top">
                          <div class="consume_sub_status">完成</div>
                          <div class="consume-sub-head">
                            <div class="consume_sub_head_label">下单时间</div>
                            <div class="consume_sub_head_value">
                              {{ item.time }}
                            </div>
                          </div>
                          <div class="consume-sub-head">
                            <div class="consume_sub_head_label">订单编号</div>
                            <div class="consume_sub_head_value"></div>
                          </div>
                          <div class="consume-sub-head">
                            <div class="consume_sub_head_label">消费门店</div>
                            <div class="consume_sub_head_value">北京路店</div>
                          </div>
                        </div>
                        <div class="consume_table_body_center">
                          <div
                            class="consume-table-body-center-item"
                            style="width: 100px"
                          >
                            <div>{{ item.type }}</div>
                          </div>
                          <div
                            class="consume-table-body-center-item"
                            style="width: 180px; flex-grow: 1"
                          >
                            <div>
                              <div>
                                <div v-for="(val, i) in item.good" :key="i">
                                  {{ val }}
                                </div>
                              </div>
                              <div></div>
                            </div>
                          </div>
                          <div
                            class="consume-table-body-center-item"
                            style="width: 150px; flex-grow: 1"
                          >
                            <div v-if="Object.keys(item.msg).length == 0">
                              -
                            </div>
                            <div v-else>
                              <div>{{ item.msg.money }}</div>
                              <div>{{ item.msg.discount }}</div>
                              <div>{{ item.msg.give }}</div>
                            </div>
                          </div>
                          <div
                            class="consume-table-body-center-item"
                            style="width: 120px"
                          >
                            <div>实收金额：{{ item.collection }}</div>
                          </div>
                          <div
                            class="consume-table-body-center-item"
                            style="width: 97px; flex-grow: 1"
                          >
                            <div>
                              <span v-for="value in item.people" :key="value">
                                {{ value }}
                              </span>
                            </div>
                          </div>
                          <div
                            class="consume-table-body-center-item"
                            style="width: 80px; border-right: none"
                          >
                            <div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="el-pagination el-pagination--small"
                    style="float: right"
                  >
                    <button type="button" disabled="disabled" class="btn-prev">
                      <i class="el-icon el-icon-arrow-left"></i>
                    </button>
                    <ul class="el-pager">
                      <li class="number active">1</li>
                      <!----><!----><!---->
                    </ul>
                    <button type="button" disabled="disabled" class="btn-next">
                      <i class="el-icon el-icon-arrow-right"></i>
                    </button>
                  </div>
                </div>
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
  data() {
    return {
      isShow: 1,
      serve: "block",
      consume: "none",
      radio3: "开单记录",
      value1: "",
      record: [
        {
          time: "2022-03-20 18:42:18",
          type: "开单",
          good: ["全身精油经络SPA-60"],
          msg: {},
          collection: "228.00",
          people: ["05号石云英"],
        },
        {
          time: "2022-03-10 21:27:04",
          type: "开单",
          good: ["日之泉|日式温泉舒缓SPA", "日之泉|日式温泉舒缓SPA"],
          msg: {},
          collection: "576.00",
          people: ["06金喜凤", "03号蔡贝"],
        },
      ],
      cards: [
        {
          time: "2022-03-20 18:42:18",
          type: "开卡",
          good: ["2000 9.8折扣"],
          msg: { money: 1196, discount: "-", give: "-" },
          collection: "1000.00",
          people: ["北京店旗舰店"],
        },
      ],
      real: [],
      // isOpen: 1,
    };
  },
  created() {
    this.real = this.record;
  },
  methods: {
    show(num) {
      this.isShow = num;
      if (num == 1) {
        this.serve = "block";
        this.consume = "none";
        this.$refs.myRef.style = "width: 56px;transform: translateX(0px);";
      } else if (num == 2) {
        this.serve = "none";
        this.consume = "block";
        this.$refs.myRef.style = "width: 56px;transform: translateX(96px);";
      }
    },
    change() {
      if (this.radio3 == "开单记录") {
        this.real = this.cards;
        // this.$forceUpdate;
      } else if (this.radio3 == "开卡记录") {
        this.real = this.record;
        // this.$forceUpdate;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.log_message {
  width: 98%;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto;
  padding: 1em 1em;
  min-height: 400px;
  .el-tabs__header {
    width: 90%;
    padding: 0;
    position: relative;
    margin: 0 0 15px;
    .el-tabs__nav-wrap {
      overflow: hidden;
      margin-bottom: -1px;
      position: relative;
      .el-tabs__nav-scroll {
        overflow: hidden;
        .el-tabs__nav {
          white-space: nowrap;
          position: relative;
          //   -webkit-transition: -webkit-transform 0.3s;
          //   transition: -webkit-transform 0.3s;
          //   transition: transform 0.3s;
          transition: transform 0.3s, -webkit-transform 0.3s;
          float: left;
          z-index: 2;
          .el-tabs__active-bar {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            background-color: #1890ff;
            z-index: 1;
            -webkit-transition: -webkit-transform 0.3s
              cubic-bezier(0.645, 0.045, 0.355, 1);
            transition: -webkit-transform 0.3s
              cubic-bezier(0.645, 0.045, 0.355, 1);
            transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
              -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            list-style: none;
          }
          .el-tabs__item.is-top:nth-child(2) {
            padding-left: 0;
          }
          .el-tabs__item.is-active {
            color: #1890ff;
          }
          .el-tabs__item {
            padding: 0 20px;
            height: 40px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            line-height: 40px;
            display: inline-block;
            list-style: none;
            font-size: 14px;
            font-weight: 500;
            color: #303133;
            position: relative;
          }
          .el-tabs__item.is-top:last-child {
            padding-right: 0;
          }
        }
      }
    }
    .el-tabs__nav-wrap::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: #dfe4ed;
      z-index: 1;
    }
  }
  .el-tabs__content {
    overflow: hidden;
    position: relative;
    .el-tab-pane {
      .service_container {
        padding: 8px 0 22px;
        width: 100%;
        height: 100%;
        .service_content {
          width: 100%;
          .timeline {
            padding-top: 20px;
            .el-timeline {
              margin: 0;
              font-size: 14px;
              list-style: none;
              .el-timeline-item {
                position: relative;
                padding-bottom: 20px;
                .el-timeline-item__tail {
                  position: absolute;
                  left: 4px;
                  height: 100%;
                  border-left: 2px solid #dfe4ed;
                }
                .el-timeline-item__node--normal {
                  left: -1px;
                  width: 12px;
                  height: 12px;
                }
                .el-timeline-item__node {
                  position: absolute;
                  background-color: #dfe4ed;
                  border-radius: 50%;
                  display: -webkit-box;
                  display: -ms-flexbox;
                  display: flex;
                  -webkit-box-pack: center;
                  -ms-flex-pack: center;
                  justify-content: center;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
                  align-items: center;
                }
                .el-timeline-item__wrapper {
                  position: relative;
                  padding-left: 28px;
                  top: -3px;
                  .el-timeline-item__content {
                    color: #303133;
                    .service_content_item {
                      span {
                        color: rgba(0, 0, 0, 0.6);
                        margin-right: 32px;
                        line-height: 20px;
                        font-size: 14px;
                        font-weight: 400;
                        letter-spacing: 0;
                      }
                    }
                  }
                  .el-timeline-item__timestamp.is-bottom {
                    margin-top: 8px;
                  }
                  .el-timeline-item__timestamp {
                    color: #909399;
                    line-height: 1;
                    font-size: 13px;
                  }
                }
              }
            }
            .el-divider--horizontal {
              margin: 0 0 20px 0;
              display: block;
              height: 1px;
              width: 100%;
            }
            .page {
              display: flex;
              -webkit-box-orient: horizontal;
              -webkit-box-direction: normal;
              //   -ms-flex-direction: row;
              flex-direction: row;
              -webkit-box-pack: end;
              // -ms-flex-pack: end;
              justify-content: flex-end;
              .el-pagination {
                white-space: nowrap;
                padding: 2px 5px;
                color: #303133;
                font-weight: bold;
                span:not([class*="suffix"]),
                button {
                  display: inline-block;
                  font-size: 13px;
                  min-width: 35.5px;
                  height: 28px;
                  line-height: 28px;
                  vertical-align: top;
                  -webkit-box-sizing: border-box;
                  box-sizing: border-box;
                }
                .el-pagination__total {
                  margin-right: 10px;
                  font-weight: normal;
                  color: #606266;
                }
                button:disabled {
                  color: #c0c4cc;
                  background-color: #ffffff;
                  cursor: not-allowed;
                }
                .btn-prev {
                  padding-right: 12px;
                }
                .btn-prev,
                .btn-next {
                  background: center center no-repeat;
                  background-size: 16px;
                  background-color: #ffffff;
                  cursor: pointer;
                  margin: 0;
                  color: #303133;
                }
                .el-pager {
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;
                  list-style: none;
                  display: inline-block;
                  vertical-align: top;
                  font-size: 0;
                  padding: 0;
                  margin: 0;
                  li.active {
                    color: #1890ff;
                    cursor: default;
                  }
                  li {
                    padding: 0 4px;
                    background: #ffffff;
                    vertical-align: top;
                    display: inline-block;
                    font-size: 13px;
                    min-width: 35.5px;
                    height: 28px;
                    line-height: 28px;
                    cursor: pointer;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    text-align: center;
                    margin: 0;
                  }
                }
              }
              .el-pagination::before,
              .el-pagination::after {
                display: table;
                content: "";
              }
              .el-pagination::after {
                clear: both;
              }
            }
          }
        }
      }
      .consume_container {
        padding: 8px 0 22px;
        width: 100%;
        height: 100%;
        // .el-radio-group {
        //   display: inline-block;
        //   line-height: 1;
        //   vertical-align: middle;
        //   font-size: 0;
        // }
        // .el-range-editor--small.el-input__inner {
        //   height: 32px;
        // }
        .consume_data_table {
          .all {
            .consume_table {
              .consume_table_head {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: start;
                -ms-flex-pack: start;
                justify-content: flex-start;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                background: #fafafa;
                border-radius: 6px;
                margin-bottom: 12px;
                [class^="consume_table_head_item"] {
                  padding: 10px 8px;
                  font-family: PingFangSC-Medium;
                  font-size: 12px;
                  color: #999;
                  line-height: 17px;
                }
              }
              .consume_table_body {
                .cosume_table_body_item {
                  margin-bottom: 10px;
                  .consume_table_body_item_top {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-pack: start;
                    -ms-flex-pack: start;
                    justify-content: flex-start;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                    background: #fafafa;
                    border-radius: 6px 6px 0 0;
                    padding: 8px 14px 7px;
                    .consume_sub_status {
                      font-family: PingFangSC-Regular;
                      font-size: 11px;
                      color: #999;
                      line-height: 16px;
                      padding: 4px 9px;
                      background: rgba(153, 153, 153, 0.1);
                      border-radius: 8px;
                      margin-right: 13px;
                    }
                    .consume-sub-head {
                      margin-right: 30px;
                      .consume_sub_head_label {
                        font-family: PingFangSC-Regular;
                        font-size: 11px;
                        color: #999;
                        letter-spacing: -0.55px;
                        line-height: 16px;
                        margin-right: 11px;
                        display: inline-block;
                      }
                      .consume_sub_head_value {
                        display: inline-block;
                        font-family: PingFangSC-Medium;
                        font-size: 11px;
                        color: #777;
                        letter-spacing: 0.05px;
                        line-height: 16px;
                      }
                    }
                  }
                  .consume_table_body_center {
                    display: -ms-flexbox;
                    display: -webkit-box;
                    display: flex;
                    border: 1px solid #f7f7f7;
                    border-top: none;
                    border-radius: 0 0 6px 6px;
                    .consume-table-body-center-item {
                      font-size: 12px !important;
                      line-height: 24px;
                      padding: 12px 8px;
                      text-align: left;
                      vertical-align: middle;
                      border-right: 1px solid #f7f7f7;
                      display: -webkit-box;
                      display: -ms-flexbox;
                      display: flex;
                      -webkit-box-align: start;
                      -ms-flex-align: start;
                      align-items: flex-start;
                      -ms-flex-wrap: wrap;
                      flex-wrap: wrap;
                      -webkit-box-orient: vertical;
                      -webkit-box-direction: normal;
                      -ms-flex-direction: column;
                      flex-direction: column;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>