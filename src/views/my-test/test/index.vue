<template>
  <div class="main">
    <div class="left">
      <One :user="one"></One>
      <Two></Two>
    </div>
    <div class="right">
      <Three></Three>
      <Four></Four>
    </div>
  </div>
</template>

<script>
import One from "./Oneone.vue";
import Two from "./Two.vue";
import Three from "./Three.vue";
import Four from "./Four.vue";
export default {
  components: {
    One,
    Two,
    Three,
    Four,
  },
  data() {
    return {
      one: [
        ["生日", "2022-01-04"],
        ["电话", "13816912059"],
        ["微信", "-"],
        ["服务顾问", "北京店旗舰店"],
        ["注册门店", "北京路店"],
        ["注册时间", "2022-01-23 12:18:09"],
        ["最近消费门店", "-"],
        ["会员来源", "其他"],
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.main {
  display: flex;
  justify-content: space-between;
  background-color: #f4f5f5;
  padding: 0.7em 1em;
  .left {
    flex: 1;
  }
  .right {
    flex: 4;
  }
}
</style>