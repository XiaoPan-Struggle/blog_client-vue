<template>
  <div class="header">
    <template v-if="!isLogin">
      <h2 id="h2">BLOG SHARE</h2>
      <nav id="nav">
        <router-link to="/login">
          <el-button type="primary">立即登录</el-button>
        </router-link>
        <router-link to="/register">
          <el-button type="primary">注册账号</el-button>
        </router-link>
      </nav>
    </template>
    <template v-if="isLogin">
      <h1>BLOG SHARE</h1>
      <i class="edit"></i>
      <img class="avatar" src="http://cn.gravatar.com/avatar/1?s=128&d=identicon" alt="">
    </template>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      isLogin: true
    };
  }
};

</script>

<style lang="scss" scoped>
.header {
  padding: 10px;
  display: grid;
  justify-items: center;
  grid-template-columns: 40% 20% 40%;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: ". h2 ."
                         ". nav .";
  background-color: #007bb1;
  text-align: center;

  h1 {
    align-self: center;
    font-size: 34px;
  }

  #h2 {
    grid-area: h2;
    font-size: 34px;
    color: #fff;
  }

  #nav {
    width: 100%;
    margin-top: 30px;
    padding: 10px;
    grid-area: nav;
    display: flex;
    justify-content: space-between;
  }

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
}
</style>
