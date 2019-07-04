<template>
  <div class="index">
    <AppHeader />
    <Sidebar />
    <main class="rightContainer" :class="{'content-collapse':collapse}">
      <Breadcrumb />
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </main>
  </div>
</template>

<script>
import AppHeader from "../components/Header";
import Sidebar from "../components/Sidebar";
import AppAside from "../components/Aside";
import Breadcrumb from "../components/Breadcrumb";
import bus from "@/vueTool/bus";
export default {
  name: "full",
  data() {
    return {
      tagsList: [],
      collapse: false
    };
  },
  components: {
    AppHeader,
    Sidebar,
    AppAside,
    Breadcrumb
  },
  created() {
    //内容区域跟随变化
    bus.$on("collapse", msg => {
      console.log(msg);
      this.collapse = msg;
    }),
      // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
      bus.$on("tags", msg => {
        let arr = [];
        for (let i = 0, len = msg.length; i < len; i++) {
          msg[i].name && arr.push(msg[i].name);
        }
        this.tagsList = arr;
      });
  },
  computed: {
    // name() {
    //   return this.$route.name;
    // },
    // list() {
    //   // 子路由的信息
    //   return this.$route.matched;
    // }
  }
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content {
  width: auto;
  height: 100%;
  padding: 10px;
  overflow-y: scroll;
  box-sizing: border-box;
  @include hidebar;
}
.rightContainer.content-collapse {
  left: 48px;
}
.rightContainer {
  position: absolute;
  left: 180px;
  right: 0;
  top: 40px;
  height: 100%;
  overflow-y: scroll;
  @include hidebar;
  padding-bottom: 30px;
  transition: left 0.3s ease-in-out;
}
</style>

