<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

body{margin: 0;padding: 0;}
a{text-decoration: none}
i{display: block;}
ul{list-style: none;padding: 0;margin: 0;}
h4{display: inline;}
input::-webkit-input-placeholder{color:rgba(175,180,202,1);}
html{width: 100%;height: 100%;background: #f5f5f5;}

  .el-button--primary:hover{
    background-color: #409eff;
  }
  .el-button--primary:focus{
    background-color: #409eff;
  }
  .el-button--primary:active{
    background-color: #1455FA;
  }
  .el-button--primary{
    background-color: #1455FA;

  }
</style>
