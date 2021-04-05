<template>
  <div class="home">
    <router-link to="/login">
      <el-button type="primary">立即登录</el-button>
    </router-link>
    <router-link to="/register">
      <el-button type="primary">立即注册</el-button>
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import request from '@/helpers/request';
import auth from '@/api/auth';

window.request = request
window.auth = auth

export default {
  name: 'Home',
  components: {}
}
</script>
