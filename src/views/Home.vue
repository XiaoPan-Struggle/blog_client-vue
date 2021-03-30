<template>
  <div class="home">
    <el-button type="primary">确定</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import request from '@/helpers/request';
import auth from '@/api/auth';
window.request  = request
window.auth = auth

export default {
  name: 'Home',
  components: {
  }
}
</script>
