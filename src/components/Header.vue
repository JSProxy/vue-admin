<template>
  <div class="header-wrapper">
    <div class="left-box anima run-top">
      <div class="menu-btn-box">
        <div class="menu-btn">
          <span class="icon-cell"></span>
          <span class="icon-cell"></span>
          <span class="icon-cell"></span>
        </div>
      </div>
      <div class="logo-text" @click="collapseChage">华云数字</div>
    </div>
    <div class="nav-bar">
      <div>admin</div>
      <div class="login-out">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhuxiao" />
        </svg>
        <div>注销</div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import "@/assets/iconfont/zhuxiao.js";
import bus from "@/vueTool/bus";
export default {
  data() {
    return {
       collapse: false
    };
  },
   methods: {
    collapseChage() {
      //点击隐藏左侧菜单栏，
      this.collapse = !this.collapse;
      //非父子组件传值
      bus.$emit("collapse", this.collapse);
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.header-wrapper {
  display: flex;
  height: 40px;
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  z-index: 100;
  overflow: hidden;
  background-color: #108ee9;
  .nav-bar {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: white;
    .login-out {
      display: flex;
      width: 100px;
      height: 40px;
      align-items: center;
      justify-content: center;
    }
  }
}

.left-box {
  width: 170px;
  height: 80px;
  overflow: hidden;
  .menu-btn-box {
    display: flex;
    width: 100%;
    height: 40px;
    // background-color: orange;
    align-items: center;
    .menu-btn {
      display: flex;
      flex-direction: column;
      width: 30px;
      height: 30px;
      padding: 5px 5px;
      box-sizing: border-box;
      justify-content: space-around;
      .icon-cell {
        height: 2px;
        border-radius: 1px;
        background-color: white;
      }
    }
  }
  .logo-text {
    color: white;
    font-size: 25px;
    font-weight: 500;
    width: 170px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
}
.anima{
  transition: all 0.3s linear;
}
@media only screen and (min-width: 991px)
{
  .run-top{
     margin-top: -40px;
  }
}


</style>