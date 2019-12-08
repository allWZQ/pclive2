<template>
  <div class="home">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>
<script>
import LayoutHeader from "./components/Header";
import LayoutMain from "./components/Main";
import LayoutNav from "./components/Nav";
export default {
  name: "home",
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutNav
  }
};
</script>
