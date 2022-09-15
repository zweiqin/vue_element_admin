<template>
  <div class="card_message">
    <div class="el-tabs el-tabs--top">
      <div class="el-tabs__header is-top">
        <div class="el-tabs__nav-wrap is-top">
          <div class="el-tabs__nav-scroll">
            <div role="tablist" class="el-tabs__nav is-top" style="transform: translateX(0px)">
              <div class="el-tabs__active-bar is-top" style="width: 0px; transform: translateX(0px)"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="el-tabs__content">
        <div class="vip_card">
          <div class="card_item">
            <div disabled="disabled" class="card_item_container stored_card">
              <div class="card_content">
                <div class="card_type">储蓄</div>
                <div class="card_name">2000 9.8折扣</div>
                <div class="card_deadline">有效期：<span style="margin-left: 1em">永久有效</span></div>
                <div>
                  <div class="card_surplus_money">余额 ¥1196</div>
                  <div class="card_surplus_detail">
                    <span class="card_surplus_times"> 剩余项目次数0次 </span>
                  </div>
                </div>
                <div class="card_charge">充值</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.card_message {
  width: 98%;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto 1em;
  padding: 1em 1em;
  .el-tabs__header {
    width: 90%;
    padding: 0;
    position: relative;
    margin: 0 0 15px;
    .el-tabs__nav-wrap {
      overflow: hidden;
      margin-bottom: -1px;
      position: relative;
    }
  }
  .el-tabs__content {
    overflow: hidden;
    position: relative;
    .vip_card {
      padding: 16px 10px 22px;
      .card_item {
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        flex-direction: row;
        -webkit-box-pack: start;
        justify-content: flex-start;
        -webkit-box-align: start;
        align-items: flex-start;
        flex-wrap: wrap;
        margin-bottom: 17px;
        .stored_card {
          background: url(../assets/stored_card.d00d7964.png) no-repeat;
          background-size: cover;
          .card_content {
            padding: 12px 16px 9px;
            position: relative;
            .card_type {
              position: absolute;
              top: 0;
              right: 0;
              font-family: PingFangSC-Medium;
              font-size: 11px;
              color: #eddbcc;
              line-height: 16px;
              padding: 3px 9px;
              border-top-right-radius: 3px;
              border-bottom-left-radius: 10px;
              background-color: rgba(255, 255, 255, 0);
            }
            .card_name {
              font-family: PingFangSC-Medium;
              font-size: 18px;
              color: #f6ebe1;
              text-shadow: 0 1px 2px rgb(54 53 62 / 20%);
              line-height: 25px;
            }
            .card_deadline {
              line-height: 12px;
              opacity: 0.5;
              font-family: Helvetica;
              font-size: 10px;
              color: #eddbcc;
              margin-top: 4px;
              margin-bottom: 16px;
            }
            div {
              .card_surplus_money {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #f6e8db;
                line-height: 20px;
              }
              .card_surplus_detail {
                text-overflow: ellipsis;
                overflow: hidden;
                font-size: 11px;
                color: #f6e8db;
                line-height: 16px;
                opacity: 0.8;
                font-family: PingFangSC-Regular;
              }
            }
            .card_charge {
              position: absolute;
              bottom: -2em;
              left: 1em;
              cursor: pointer;
              font-family: PingFangSC-Medium;
              font-size: 11px;
              color: #dc5c5c;
              line-height: 16px;
              padding: 3px 9px;
              // border-top-right-radius: 3px;
              // border-bottom-left-radius: 10px;
              background-color: #e3cbcb;
              letter-spacing: 1.5px;
              border-radius: 10px;
              font-weight: 700;
              -webkit-box-shadow: 1.2px 1.2px 5px -2px rgb(0 0 0 / 60%), -0.1px -0.1px 5px -3px rgb(0 0 0 / 10%);
              box-shadow: 1.2px 1.2px 5px -2px rgb(0 0 0 / 60%), -0.1px -0.1px 5px -3px rgb(0 0 0 / 10%);
            }
          }
        }
        .card_item_container {
          // position: relative;
          min-width: 250px;
          border-radius: 4px;
          // -webkit-box-sizing: content-box;
          box-sizing: content-box;
          padding-bottom: 30px;
          position: relative;
          margin-right: 6px;
          min-height: 119px;
          margin-bottom: 17px;
        }
      }
    }
  }
}
</style>
