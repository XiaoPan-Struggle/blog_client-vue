<template>
  <div id="app">
    <Header id="header" />
    <main id="main">
      <router-view/>
    </main>
    <Footer id="footer" />
  </div>
</template>

<script lang="js">
import Header from '@/components/header';
import Footer from '@/components/footer';
export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
body,h1,h2,h3,h4,h5{
  padding: 0;
  margin: 0;
}
*{
  box-sizing: border-box;
}
html,body,#app{
  height: 100%;
}
#app {
  background-color: #fafafa;
  display: grid;
  grid-template-columns: 12% auto 12%;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: "header header header"
                       ". main ."
                       "footer footer footer" ;
  #header {
    grid-area: header;
  }
  #main{
    grid-area: main;
    background-color: #8accc8;
  }
  #footer{
    grid-area: footer;
  }
}
a {
  font-weight: bold;
  text-decoration: none;
}
</style>
