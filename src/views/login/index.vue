<template>
  <div class="login">
     login
  </div>
</template>

<script type="text/javascript">
import {api_getAuth} from'@/api/login'
export default {
  data() {
    return {

    }
  },
  components: {

  },
  async created(){
      // 开发状态和发布状态
    if (process.env.NODE_ENV === "development") 
    {
      document.cookie = "3CUCSID=" + escape("a55fa20367028c93a55a1511fdcf2202");
      document.cookie =
        "sl_openid=" + escape("ec7q42CYlhIl%2FinvAlsz7Atf14UZJFP3uTrUBw%3D%3D");
    }
     let data = await  api_getAuth();
  }
}
</script>

<style lang="scss" scoped>
</style>
