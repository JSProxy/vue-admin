<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar/>
      <main class="main">
        <Breadcrumb/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import AppHeader from '../components/Header'
import Sidebar from '../components/Sidebar'
import AppAside from '../components/Aside'
import Breadcrumb from '../components/Breadcrumb'

export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    AppAside,
    Breadcrumb
  },
  computed: {
    name () {
      return this.$route.name
    },

    list () {
      // 子路由的信息
      return this.$route.matched
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-body{
    position: absolute;
    top: 40px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    .main{
      position: absolute;
      left: 180px;
      top: 0px;
      right: 0px;
      bottom: 0px;
    }
    .container-fluid{
      width: 100%;
      background-color: white;
    }
  }
</style>

