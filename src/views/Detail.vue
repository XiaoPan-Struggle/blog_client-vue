<template>
  <div id="detail">
    <section class="user-info">
      <img :src="user.avatar" :alt="user.username" :title="user.username" class="avatar">
      <h3>{{ title }}</h3>
      <p>
        <router-link :to="`/user/${user.id}`">{{ user.username }}</router-link>
        发布于{{ friendlyDate(createdAt) }}天前
      </p>
    </section>
    <section class="article" v-html="markdown">
    </section>
  </div>
</template>

<script>
import marked from 'marked'
import blog from '@/api/blog';
export default {
  name: 'Detail',
  data() {
    return {
      title: '',
      rawContent: '',
      user: {
        avatar: null,
        username: null
      },
      createdAt: '',
      blogId: null
    };
  },
  computed: {
    markdown(){
      return marked(this.rawContent)
    }
  },
  created() {
    this.blogId = this.$route.params.blogId
    blog.getDetail({blogId: this.blogId})
      .then(res => {
        let {title,content,createdAt,user} = res.data
        this.title = title
        this.rawContent = content
        this.user = user
        this.createdAt = createdAt
        console.log(res);
      })
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/article.scss";

#detail {
  .user-info {
    display: grid;
    grid: auto auto / 80px 1fr;
    margin-top: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #a84a62;

    .avatar {
      grid-row: 1 / span 2;
      grid-column: 1;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

    h3 {
      grid-row: 1;
      grid-column: 2;
      margin: 5px 0;
    }

    p {
      grid-row: 2;
      grid-column: 2;
      margin-top: 0;
      font-size: 12px;

      a {
        color: #a84a62;
        text-decoration: none;
      }
    }
  }

  .article {
    padding: 30px;
  }

}
</style>
