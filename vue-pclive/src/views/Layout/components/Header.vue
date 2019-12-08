<template>
  <div>
    <div id="header-wrap">
      <div class="content-wrap">
        <!-- 内容 -->
        <el-row>
          <el-col :span="2">
            <!-- titleImg -->
            <div class="contentImg"><img src="../../../assets/logo.png" /></div>
          </el-col>
          <el-col :span="2">
            <div class="wrap-content">
              <el-button size="mini" round>首页</el-button>
              <el-button size="mini" round>直播</el-button>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="wrap-content2">
              <el-dropdown>
                <span class="el-dropdown-link">
                  分类<i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                  <el-dropdown-item>螺蛳粉</el-dropdown-item>
                  <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                  <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown>
                <span class="el-dropdown-link">
                  赛事<i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                  <el-dropdown-item>螺蛳粉</el-dropdown-item>
                  <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                  <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown>
                <span class="el-dropdown-link">
                  视频<i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                  <el-dropdown-item>螺蛳粉</el-dropdown-item>
                  <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                  <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="wrap-content3">
              <el-input placeholder="请输入内容" v-model="input" size="small">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <div>1</div>
          </el-col>
          <el-col :span="3">
            <div class="wrap-conten4">
              <el-link icon="el-icon-video-camera" :underline="false">
                开播</el-link
              >
              <el-link icon="el-icon-download" :underline="false">下载</el-link>
              <el-link icon="el-icon-pie-chart" :underline="false"
                >历史</el-link
              >
            </div>
          </el-col>
          <el-col :span="2">
            <div class="wrap-conten4">
              <el-link
                icon="el-icon-user"
                :underline="false"
                @click="(dialogLogin = true), (model1 = 'login')"
                >登陆</el-link
              >
              <i class="el-icon-minus"></i>
              <el-link :underline="false" @click="dialogLogin = true"
                >注册</el-link
              >
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 登陆窗口 -->
    <dialogLogin :flog.sync="dialogLogin" :log="model1" />
  </div>
</template>
<script>
import DialogLogin from "../../login/Dialog";
import { ref } from "@vue/composition-api";
export default {
  name: "Header",
  components: {
    DialogLogin
  },
  setup() {
    //登陆注册按钮
    const dialogLogin = ref(false);
    const model1 = ref("register");
    console.log(model1.value);
    const input = ref("");
    return {
      input,
      dialogLogin,
      model1
    };
  }
};
</script>
<style lang="scss" scoped>
#header-wrap {
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  height: 60px;
  background-color: rgb(255, 255, 255);
  line-height: 75px;
  //阴影x，y轴的长度 ,大小，扩展， 颜色以及透明度
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  @include webkit(transition, all 0.3s ease 0s);
}
.content-wrap {
  display: block;
  margin: 0px auto;
  width: 1400px;
  height: 60px;
}
.content-wrap img {
  width: 60px;
  height: 60px;
}
//首页，直播
.wrap-content {
  display: flex;
  flex: 1;
  width: 100%;
  padding: 14px 0 0 5px;
}
.wrap-content .el-button {
  color: rgb(53, 53, 53);
  border: none;
  height: 32px;
  font-size: 17px;
  display: block;
  text-align: center;
}
.wrap-content .el-button:hover {
  background: $mainColor;
  color: white;
}
//分类，赛事，直播
.wrap-content2 {
  display: flex;
  flex: 1;
  width: 100%;
  height: 60px;
  padding: 14px 0 0 30px;
}
.el-dropdown {
  height: 32px;
  padding: 0px 0 0 15px;
  line-height: 32px;
  display: block;
  border-radius: 50px;
  font-size: 17px;
  margin: 0 auto;
}
.el-dropdown:hover {
  background: $mainColor;
  cursor: pointer;
  color: white;
}
.el-dropdown:hover i {
  transform: rotateZ(180deg);
  color: white;
}
.el-icon-caret-bottom {
  transition: all 0.5s;
  margin-left: 5px;
  color: rgb(53, 53, 53);
}
//搜索框
.wrap-content3 {
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin-left: 60px;
}
.wrap-content3 i {
  width: 40px;
  height: 32px;
  color: rgb(95, 95, 95);
}
.el-input {
  height: 32px;
  line-height: 32px;
}
.el-input:hover i {
  color: $mainColor;
}
//开播，下载，历史
.wrap-conten4 {
  display: flex;
  flex: 1px;
  width: 100%;
  height: 20px;
  padding: 20px 0 0 5px;
}
.wrap-conten4 .el-link {
  margin: 0px auto;
  font-size: 15px;
}
.wrap-conten4 .el-link:hover {
  color: $mainColor;
}
//登陆注册icon
.el-icon-minus {
  transform: rotateZ(90deg);
  color: rgb(95, 95, 95);
}
</style>
