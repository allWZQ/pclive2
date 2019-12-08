<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
        111
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
#main-wrap {
  height: 100vh;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: 60px;
  padding-right: 30px;
  padding-left: 285px;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all 0.3s ease 0s);
  background-color: rgb(250, 250, 250);
}
.content {
  width: 100%;
  height: 100%;
  @include webkit(box-sizing, border-box);
  background-color: #fff;
}
</style>
