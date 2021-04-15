### 金库

> 一个可以供多人写博客的平台，开发者们可以在这里记录博客与欣赏他人博客！

### 技术选型

- vue2.x
- Element
- axios

### 开始

```
vue create blog-client // 脚手架创建 Vue项目
yarn add vuex  // 安装 vuex
yarn add axios // 安装 axios
yarn add element-ui // 安装 element-ui
```

技术准备完毕！

### 配置及封装

#### axios封装

```
import axios from 'axios'
import { Message } from 'element-ui'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = '//blog-server.hunger-valley.com'

export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type,
    }
    if(type.toLowerCase() === 'get') {
      option.params = data
    }else {
      option.data = data
    }
    if(localStorage.token) {
      axios.defaults.headers.common['Authorization']  = localStorage.token
    }

    axios(option).then(res => {
      console.log(res.data)
      if(res.data.status === 'ok') {
        if(res.data.token) {
          localStorage.token = res.data.token
        }
        resolve(res.data)
      }else{
        Message.error(res.data.msg)
        reject(res.data)
      }
    }).catch(err => {
      Message.error('网络异常')
      console.log(err);
      reject({ msg: '网络异常' })
    })
  })
}
```

#### 时间格式处理封装

```
// 2021-01-08T07:25:44.192Z    ===》 n 天前
function friendlyDate(datsStr) {
  let dateObj = typeof datsStr === 'object' ? datsStr : new Date(datsStr)
  let time = dateObj.getTime()
  let now = Date.now()
  let space = now - time
  let str = ''

  switch (true) {
    case space < 60000:
      str = '刚刚'
      break
    case space < 1000 * 3600:
      str = Math.floor(space/60000) + '分钟前'
      break
    case space < 1000 * 3600 * 24:
      str = Math.floor(space/(1000 * 3600)) + '小时前'
      break
    default:
      str = Math.floor(space/(1000*3600+245)) + '天前'
  }
  return str
}

export default {
  install(Vue) {
    Vue.prototype.friendlyDate = friendlyDate
  }
}
```

#### 路由守卫

```
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(1);
    store.dispatch('checkLogin')
      .then(isLogin => {
        console.log(2);
        // 需要验证的路由
        if (isLogin) {
          next()
        }
      })
      .catch(() => {
        console.log(3);
        // 是否登录
        next({
          path: '/login',
          query: {redirect: to.fullPath}
        })
      })
  } else {
    console.log(4);
    next() // 确保一定要调用 next()
  }
```

#### vuex 使用

```
// 其中一个模块

import auth from '@/api/auth';

export default {
  state: {
    user: null,
    isLogin: false
  },
  getters: {
    user: state => state.user,
    isLogin: state => state.isLogin
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user
    },

    setLogin(state, payload) {
      state.isLogin = payload.isLogin
    }
  },
  actions: {
    login({commit}, {username, password}) {
      return auth.login({username, password})
        .then(res => {
          commit('setUser', {user: res.data})
          commit('setLogin', {isLogin: true})
        })
    },

    async register({commit}, {username, password}) {
      let res = await auth.register({username, password})
      commit('setUser', {user: res.data})
      commit('setLogin', {isLogin: true})
    },

    async checkLogin({commit, state}) {
      if (state.isLogin) return true
      let res = await auth.getInfo()
      commit('setLogin', {isLogin: res.isLogin})
      if (!res.isLogin) return false
      commit('setUser', {user: res.data})
      return true
    },

    async logout({commit}) {
      await auth.logout()
      commit('setLogin', {isLogin: false})
      commit('setUser', {user: null})
      localStorage.setItem('token','')
    }
  }
}
```

#### Element-ui 配置

```
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
```

封装和配置完成！

### 创建页面

```
Home.vue // 首页
Login.vue // 登录页
Register.vue // 注册页
Detail.vue // 博客详情页
Create.vue // 创建博客页
Edit.vue // 修改博客页
My.vue // 我的
User.vue // 用户页
```

### 登录验证

> 使用 localstorage 结合 vuex 实现，在 localstorage 里储存 token ，每一次请求都会带上 token，当登录成功会返回一个 isLogin 的值，我们将其储存在vuex进行管理，因为很多页面都需要用到它，在 vuex 里有一个 改变 isLogin 的值的方法，请求页封装在vuex里了，用于来修改 isLogin 的值，这里isLogin在路由守卫里会用到，因为有些页面没登录是没有权限访问！

### 细节处理

> 删除功能

```
// 当成功删除后，页面不刷新，以前都是重新调一下接口，获取全部
// 这次：前端使用筛选，渲染未删除的数据
this.blogs = this.blogs.filter(blog => blog.id !== blogId)
```

> 当未登录访问了无权限的页面

```
// 需求：想让登录之后会跳转到那个页面
// 使用 this.$route.query.redirect 拿到那个路由参数
// 当登录后看是否有访问过，有就跳转，无就到首页

onLogin() {
  this.login({username:this.username,password:this.password})
    .then(() => {
      this.$router.push({path: this.$route.query.redirect || '/'})
    })
}
```

> 路径传值取值

```
this.xxx = this.$route.query.xxx
```

### 项目完成，打包发布

```
// vue.config.js
module.exports = {
  lintOnSave: false,
  publicPath: './',
  outputDir: './dist',
  assetsDir: 'static'
}
```

### 项目总结

1. 学习到了封装代码的魅力，能提升代码可读性，使得页面更简洁
2. 结合 vuex ，复习 vuex 用法，封装获取登录状态请求在vuex里，暴露给需要用的地方使用
3. 时间格式处理的插件编写，用 Vue.use(Util) 暴露给所有地方使用
4. axios 的请求封装，后端接口规范，及前端接口封装规范
