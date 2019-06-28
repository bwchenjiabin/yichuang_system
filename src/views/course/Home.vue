<template>
        <div class="box">
                <el-container>
                    <el-header>
                        <Header></Header>
                    </el-header>
                    <el-container>
                        <el-aside width="200px">
                            <sidebar></sidebar>
                        </el-aside>
                        <el-main>
                            <div class="title">
                                <h3>176****0684的店铺</h3>
                                <span class="bq">标准版</span>
                            </div>
                            <ul class="cont">
                                <li>
                                    <h3>1,700</h3>
                                    <span>总用户（人）</span>
                                </li>
                                <li>
                                    <h3>3,458.00</h3>
                                    <span>今日收入（元）</span>
                                </li>
                                <li>
                                    <h3>12,754.00</h3>
                                    <span>总收入（元）</span>
                                </li>
                            </ul>
                        </el-main>
                    </el-container>
                </el-container>
        </div>    
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
      },
        methods:{
    
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
  body > .el-container {margin-bottom: 40px;}
 .el-header, .el-footer {background-color: #fff;color: #333;text-align: center;line-height: 60px;}
 .el-header{margin-bottom: 20px;}
 .el-aside {margin-left: 20px;margin-right: 20px;background-color: #fff;color: #333;text-align: center;line-height: 200px;}
 .el-main {background-color: #fff;color: #333;}
    </style>
    