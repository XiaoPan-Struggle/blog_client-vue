<template>
  <div id="my">
    <section class="user-info">
      <img :src="user.avatar" :alt="user.username" class="avatar">
      <h3>{{user.username}}</h3>
    </section>
    <section>
      <router-link :to="`/detail/${blog.id}`" class="item" v-for="blog in blogs" :key="blog.id" >
        <div class="date">
          <span class="day">{{splitDate(blog.createdAt).date}}</span>
          <span class="month">{{splitDate(blog.createdAt).month}}</span>
          <span class="year">{{splitDate(blog.createdAt).year}}</span>
        </div>
        <h3>{{ blog.title }}</h3>
        <p>{{blog.description}}</p>
      </router-link>
    </section>
    <section class="pagination">
      <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :current-page.sync="page"
          :page-size="20"
          :total="total">
      </el-pagination>
    </section>
  </div>
</template>

<script lang="js">
import blog from '@/api/blog';
export default {
  name: "User",
  data(){
    return {
      blogs: [],
      user: {},
      page: 1,
      total: 0
    }
  },
  created() {
    this.userId = this.$route.params.userId
    this.page = this.$route.params.page || 1
    blog.getBlogByUserId(this.userId,{page:this.page})
      .then(res => {
        console.log(res);
        let {page,total,data} = res
        this.page = page
        this.total = total
        this.blogs = data
        if (res.data.length > 0) {
          this.user = res.data[0].user
        }
      })
  },
  methods: {
    handleCurrentChange(val){
      blog.getBlogByUserId(this.userId,{ page: val })
          .then(res => {
            this.blogs = res.data
            this.total = res.total
            this.page = res.page
            this.$router.push({path: `/user/${this.userId}`,query: {page: val}})
          })
    },
    splitDate(dataStr) {
      let dateObj = dataStr.split('-')
      // let dateObj = typeof dataStr === 'object' ? dataStr : new Date(dataStr)
      let year = dateObj[0]
      let month = dateObj[1]
      let date = dateObj[2].slice(0,2)
      return {
        date,
        month,
        year
      }
    }
  }
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
    grid: auto auto / 80px 1fr;
    margin: 40px 0;

    .date{
      grid-column: 1;
      grid-row: 1 / span 2;
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
      color: #666;
    }
  }

  a{
    color: #333;
  }

  .pagination {
    display: grid;
    justify-items: center;
    margin-bottom: 20px;
  }
}
</style>
