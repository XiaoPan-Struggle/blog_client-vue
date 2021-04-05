<template>
  <div class="header">
    <h2 id="h2">BLOG SHARE</h2>
    <nav id="nav">
      <router-link to="/login">
        <el-button type="primary">立即登录</el-button>
      </router-link>
      <router-link to="/register">
        <el-button type="primary">注册账号</el-button>
      </router-link>
    </nav>
  </div>
</template>

<script lang="ts">
export default {
  name: 'header'
};
</script>

<style lang="scss" scoped>
  .header{
    padding: 40px;
    display: grid;
    grid-template-columns: 40% 20% 40%;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: ". h2 ."
                         ". nav ." ;
    background-color: #007bb1;
    text-align: center;
    #h2{
      grid-area: h2;
      font-size: 34px;
      color: #fff;
    }
    #nav{
      margin-top: 30px;
      grid-area: nav;
      display: flex;
      justify-content: space-between;
    }
  }
</style>
