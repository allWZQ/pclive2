<template>
  <div id="Nav-warp">1111</div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
#Nav-warp {
  //固定的
  position: fixed;
  left: 0px;
  top: 60px;
  width: 240px;
  height: 100vh;
  background-color: rgb(43, 46, 47);
  opacity: 0.9;
  //动画缓冲，美化过度
  @include webkit(box-shadow, 2px 0 1px 0px rgba(0, 0, 0, 0.1));
  @include webkit(transition, all 0.3s ease 0s);
}
</style>
