<template>
    <el-scrollbar style="height:100%">
        <div class="box">
                <el-container>
                    <el-header style="    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 20px -10px #000;">
                        <Header></Header>
                    </el-header>
                    <el-container>
                        <el-aside width="200px">
                            <sidebar></sidebar>
                        </el-aside>
                        <el-main>
                            <h4>店铺设置</h4><br><br>
                            <div class="title">
                                <i class="icon"></i>
                                <span>店铺设置</span>
                            </div>
                        </el-main>
                    </el-container>
                </el-container>
        </div>    
    </el-scrollbar>

    </template>
    <script>
import sidebar from '@/components/sidebar/sidebar.vue'
import Header from '@/components/Header/Header.vue'
    export default {
        data(){
            return{
                }
                },
        created () {
            this.reload();
      },
        methods:{
            handleClick(tab, event) {
        // console.log(tab, event);
      },
          // 初始化回到顶部
      reload() {
     $('body,html').animate({scrollTop:0},200);
    },
      handleClicks(row) {
        console.log(row);
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }

        },
        components:{
            sidebar,
            Header
        }
    }
    </script>
    <style scoped>
 .box{background: #f5f5f5;}
 h3{display: inline;}
 .title{padding: 20px;}
 .cont li{width: 300px;height: 200px;background:#F4F4F4 100%;float: left;margin-right: 20px;text-align: center;display: flex;justify-content: center;align-items: center;}
 .bq{width: 60px;height: 24px;line-height: 20px;border-radius: 1px;text-align: center;border: 1px solid rgba(0, 101, 255, 1);color: #0065FF;font-size: 14px;margin-left: 10px;}
 .el-tabs__item{padding: 0 50px;}.el-input{width: auto;}.icon{width: 6px;height: 17px;background: blue;float: left;margin-top: 3px;}
 .title{width: auto;display: block}.title span{margin-left: 10px;}
  .el-scrollbar__wrap {
   overflow-x: hidden;
 }
</style>