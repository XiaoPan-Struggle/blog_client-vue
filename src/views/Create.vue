<template>
  <div id="edit">
    <h1>创建文章</h1>
    <h3>文章标题</h3>
    <el-input></el-input>
    <p class="msg">限30个字</p>
    <h3>内容简介</h3>
    <el-input type="textarea" rows=3></el-input>
    <p class="msg">限30个字</p>
    <h3>文章内容</h3>
    <el-input type="textarea" rows=20></el-input>
    <p class="msg">限30个字</p>
    <el-button plain type="primary">确定</el-button>
  </div>
</template>

<script lang="ts">
export default {
name: "Create"
}
</script>

<style lang="scss" scoped>
#edit, #create {
  padding: 30px;

  h1 {
    text-align: center;
  }

  .msg {
    text-align: right;
    font-size: 12px;
    color: red;
  }

  ::v-deep .el-input__inner, ::v-deep .el-textarea__inner{
    border: 1px solid #42b983;
    background: #ddd;
  }
}
</style>
