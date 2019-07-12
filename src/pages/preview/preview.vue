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
                            <h4>店铺预览</h4><br><br>
                            <div class="title">
                                <i class="icon"></i>
                                <span>店铺预览</span>
                            </div>
                            <div class="content">
                                <span class="namee">店铺名称</span>
                                <span class="phone">{{this.name}}</span>
                            </div>
                            <div class="content">
                                <span class="name">店铺地址</span><span class="inp">{{this.url}}</span><span class="xiu">复制</span>
                            </div>
                         
                            <div>店铺内存：{{this.percentage}}/{{this.Memory}}</div> 
                        </el-main>
                    </el-container>
            </el-container>
        </div>    
    </template>
    <script>
import sidebar from '@/components/sidebar/sidebar.vue'
import Header from '@/components/Header/Header.vue'
import {preview} from 'api/userAjax';
    export default {
        data(){
            return{
                name:'',
                url:'',
                ewm:'',
                percentage: 10,
                Memory:'',
                }
            },
        created () {
        this.getdata();
      },
        methods:{
        // 展示
        getdata () {
        preview(localStorage.getItem('ex2')).then(res => {
            console.log(res)
            this.name = res.data.uname
            this.url = res.data.url
            this.ewm = res.data.codepath
            this.percentage = res.data.totalFileSize
            this.Memory = res.data.availableSize
      })
    },
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
 .title{width: auto;display: block}.title span{margin-left: 10px;}.content{width: 500px;height: auto;padding: 0 40px 25px 40px;display: flex;align-items: center;}.phone{display: inline-block;text-align: center;font-size: 16px;}
 .name{flex: .5;}.xiugai{width: 50px;color: rgba(0, 101, 255, 1);font-size: 16px;text-align: left;font-family: SourceHanSansSC-regular;cursor: pointer;margin-left: 20px;flex: .5;}.inp{flex: 1;height: 40px;border: 1px solid #ccc;line-height: 40px;padding-left:10px;color: rgba(16, 16, 16, 1);font-size: 14px;text-align: left;font-family: Roboto;border: 1px solid rgba(238, 238, 238, 1);}
 .xiu{width: 50px;font-size: 16px;text-align: left;font-family: SourceHanSansSC-regular;cursor: pointer;height: 40px;text-align: center;line-height: 40px;border: 1px solid rgba(238, 238, 238, 1);background-color: rgba(244, 244, 244, 1);font-size: 14px;}
 .content img{width: 180px;height: 180px;} .namee{flex: 0.35;}
</style>