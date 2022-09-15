<template>
  <div class="consume">
    <content
      ><div class="label_content" style="margin: 10px 0px"></div>
      <div class="consume_box">
        <div
          class="comsume_header"
          style="
            display: flex;
            justify-content: space-between;
            margin: 10px 0px;
          "
        >
          <div style="font-weight: bold">消费信息</div>
          <div style="color: rgb(204, 204, 204); font-size: 13px">
            最近消费：2022-03-20 18:42:09
          </div>
        </div>
      </div></content
    >
    <footer
      style="display: flex; justify-content: space-between; margin-top: 1em"
    >
      <div
        style="display: flex; flex-direction: column; justify-content: center"
      >
        <div>消费次数</div>
        <div align="center" style="margin-top: 1em; font-weight: bold">2</div>
      </div>
      <div
        style="display: flex; flex-direction: column; justify-content: center"
      >
        <div>累计消费金额</div>
        <div align="center" style="margin-top: 1em; font-weight: bold">
          ¥804
        </div>
      </div>
      <div
        style="display: flex; flex-direction: column; justify-content: center"
      ></div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.consume {
  width: 98%;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto;
  padding: 1em 1em;
  font-size: 14px;
}
</style>