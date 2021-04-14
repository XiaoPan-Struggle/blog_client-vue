<template>
  <div class="home">
    <section class="blog-posts">
      <router-link :to="`/detail/${blog.id}`" class="item" v-for="blog in blogs" :key="blog.id">
        <figure class="avatar">
          <img :src="blog.user.avatar" :title="blog.user.username">
          <figcaption>{{blog.user.username}}</figcaption>
        </figure>
        <h3>{{blog.title}} <span>{{blog.createdAt}}</span></h3>
        <p>{{ blog.description}}</p>
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

<script>
import auth from '@/api/auth';
import blog from '@/api/blog';
window.auth = auth

export default {
  name: 'Home',
  data() {
    return {
      blogs: [],
      total: 0,
      page: 1
    }
  },
  components: {
  },
  created() {
    this.page = parseInt(this.$route.query.page) || 1
    blog.getIndexBlogs({page: this.page})
      .then(res => {
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
        console.log(res);
      })
  },
  methods: {
    handleCurrentChange(val){
      blog.getIndexBlogs({
        page: val
      })
      .then(res => {
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
        this.$router.push({path: '/',query: {page: val}})
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home{

  .item{
    display: grid;
    grid: auto auto / 80px 1fr;
    margin: 50px 0;

    .avatar{
      grid-column: 1;
      grid-row: 1 / span 2;
      justify-self: center;
      margin-left: 0;
      text-align: center;

      img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }

      figcaption {
        font-size: 12px;
        color: #a84a62;
      }
    }

    h3 {
      grid-column: 2 / 3;
      grid-row: 1 / 2;
      font-size: 16px;

      & > span{
        font-size: 12px;
        font-weight: normal;
      }
    }
    p{
      grid-column: 2 / 3;
      grid-row: 2 / 3;
      color: #666;
    }
  }
  a{
    text-decoration: none;
    color: #333;
  }

  .pagination {
    display: grid;
    justify-items: center;
    margin-bottom: 20px;
  }
}
</style>
