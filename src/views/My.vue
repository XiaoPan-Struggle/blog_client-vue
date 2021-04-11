<template>
  <div id="my">
    <section class="user-info">
      <img src="http://cn.gravatar.com/avatar/1?s=128&d=identicon" alt="" class="avatar">
      <h3>若愚</h3>
    </section>
    <section>
      <div class="item">
        <div class="date">
          <span class="day">20</span>
          <span class="month">5月</span>
          <span class="year">2018</span>
        </div>
        <h3>前端异步解密</h3>
        <p>本文以一个简单的文件读写为例，讲解了异步的不同写法，包括 普通的 callback、ES2016中的Promise和Generator、 Node 用于解决回调的co 模块、ES2017中的async/await。适合初步接触 Node.js以及少量 ES6语法的同学阅读...</p>
        <div class="actions">
          <router-link to="/edit" class="editBtn">编辑</router-link>
          <a href="#">删除</a>
        </div>
      </div>

      <div class="item">
        <div class="date">
          <span class="day">20</span>
          <span class="month">5月</span>
          <span class="year">2018</span>
        </div>
        <h3>前端异步解密</h3>
        <p>本文以一个简单的文件读写为例，讲解了异步的不同写法，包括 普通的 callback、ES2016中的Promise和Generator、 Node 用于解决回调的co 模块、ES2017中的async/await。适合初步接触 Node.js以及少量 ES6语法的同学阅读...</p>
        <div class="actions">
          <router-link to="/edit" class="editBtn">编辑</router-link>
          <a href="#">删除</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
name: "My"
}
</script>

<style lang="scss" scoped>
#my{

  .user-info{
    display: grid;
    grid: auto auto / 80px 1fr;
    padding: 20px 0;
    border-bottom: 1px solid #aaa;

    .avatar{
      grid-column: 1;
      grid-row: 1 / span 2;
      justify-self: center;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

    h3{
      font-size: 16px;
    }

  }
  .item{
    display: grid;
    grid: auto auto auto / 80px 1fr;
    margin: 40px 0;

    .date{
      grid-column: 1;
      grid-row: 1 / span 3;
      justify-self: center;
      text-align: center;

      span {
        display: block;
        color: #999;
      }

      .day {
        font-size: 40px;
      }
    }

    h3{
      grid-column: 2;
      grid-row: 1;
      font-size: 16px;
    }

    p{
      grid-column: 2;
      grid-row: 2;
    }

    .actions{
      grid-column: 2;
      grid-row: 3;
      font-size: 12px;

      a{
        color: #009bbb;
        &.editBtn{
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
