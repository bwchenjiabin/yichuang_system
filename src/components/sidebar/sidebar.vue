<template>
    <el-menu
            class="el-menu-vertical-demo"
             :default-openeds="openeds"  
             :default-active="$route.path"  
             active-text-color="#1455FA"
             
        router>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-s-home"></i>
                    <span>首页</span>
                </template>
                    <el-menu-item index="/Home"><i></i>店铺首页</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>内容</span>
                    </template>
                <el-menu-item index="/content"><i></i>我的课程</el-menu-item>
            </el-submenu>

            <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-s-shop"></i>
                        <span>店铺</span>
                    </template>
                            <el-menu-item index="/preview"><i></i>店铺预览</el-menu-item>
                            <el-menu-item index="/Set"><i></i>店铺设置</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-s-marketing"></i>
                        <span>运营</span>
                    </template>
                            <el-menu-item index="/rotary"><i></i>轮播图</el-menu-item>
                            <el-menu-item index="/classify"><i></i>内容分类</el-menu-item>
                            <el-menu-item index="/Vip"><i></i>店铺会员</el-menu-item>
                            <el-menu-item index="/feedback"><i></i>用户反馈</el-menu-item>
            </el-submenu>

            <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-s-custom"></i>
                        <span>用户</span>
                    </template>
                            <el-menu-item index="/User"><i></i>我的用户</el-menu-item>
                            <el-menu-item index="/Blacklist"><i></i>黑名单</el-menu-item>
            </el-submenu>

            <el-submenu index="6">
                    <template slot="title">
                        <i class="el-icon-s-cooperation"></i>
                        <span>交易</span>
                    </template>
                            <el-menu-item index="/Order"><i></i>订单管理</el-menu-item>
            </el-submenu>
            </el-menu>
                  
    </template>
    <script>
    export default {
        data(){
            return{
                openeds: ['1','2','3','4','5','6'],
            }
        },
        created () {
      },
        methods:{
    
        },
        computed:{
        }
    }
    </script>
    <style scoped>

 .el-aside ul{    position: fixed;margin-top: 80px;    width: 200px;}
 .el-aside li{text-align: left;}
 .el-aside span{text-align: right;}
 .el-submenu__title{padding: 0;}
    </style>
    <style>
  body > .el-container {margin-bottom: 40px;}
 .el-header, .el-footer {background-color: #fff;color: #333;text-align: center;line-height: 60px;}
 .el-header{margin-bottom: 20px;position: fixed;width: 100%;z-index: 999;}
 .el-aside {margin-left: 20px;margin-right: 20px;color: #333;text-align: center;line-height: 200px;}
 .el-main {background-color: #fff;color: #333; margin-top: 80px;}
 /* .bgd{width: 5px;height: 50px;background: blue;display: inline-block;position: absolute;top: 0px;left: 0;} */
 .el-menu-item.is-active i{width: 5px;height: 50px;background: blue;display: inline-block;position: absolute;top: 0px;left: 0;}
  .el-menu-item.is-active{background: #FBFBFB;}
    </style>
    
    