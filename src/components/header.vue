<template>
  <div class="header">
    <template v-if="!isLogin">
      <h2 id="h2">BLOG SHARE</h2>
      <nav id="nav">
        <router-link to="/login">
          <router-link to="/login">
            <el-button type="primary">立即登录</el-button>
          </router-link>
        </router-link>
        <router-link to="/register">
          <router-link to="/register">
            <el-button type="primary">注册账号</el-button>
          </router-link>
        </router-link>
      </nav>
    </template>
    <template v-if="isLogin">
      <h1>BLOG SHARE</h1>
      <i class="edit"></i>
      <div class="user">
        <img class="avatar" :src="user.avatar" :alt="user.username" :title="user.username">
        <ul>
          <li>
            <router-link to="my">我的</router-link>
          </li>
          <li><a href="#" @click="onLogout">退出</a></li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {mapGetters, mapActions} from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'user'
    ])
  },
  created() {
    this.checkLogin();
  },
  methods: {
    ...mapActions([
      'checkLogin',
      'logout'
    ]),
    onLogout() {
      this.logout();
    }
  }
};

</script>

<style lang="scss" scoped>
a {
  color: #fff;
}

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

  .user {
    position: relative;
    padding: 10px;

    ul {
      display: none;
      position: absolute;
      margin: 0;
      padding: 0;
      list-style: none;
      background: #007bb1;
      transform: translateY(10px);

      li {
        padding: 10px;
        text-align: left;

        &:hover {
          background: #aaaaaa;
        }

        a {
          padding: 10px;
          font-size: 12px;
          color: #f60;
        }
      }
    }

    &:hover ul {
      display: block;
    }
  }


}
</style>
