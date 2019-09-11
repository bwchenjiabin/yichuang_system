<template>
    <el-menu
            class="el-menu-vertical-demo"
             :default-openeds="openeds"  
             :default-active="$route.path"  
             active-text-color="#1455FA" router>
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
                <el-menu-item index="/directlist"><i></i>我的直播</el-menu-item>
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
                            <el-menu-item index="/Navigation"><i></i>导航设置</el-menu-item>
                            <el-menu-item index="/advert"><i></i>广告位</el-menu-item>
                            <!-- <el-menu-item index="/Source"><i></i>素材管理</el-menu-item>  -->
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
             <el-submenu index="7">
                    <template slot="title">
                        <i class="el-icon-money"></i>
                        <span>资产</span>
                    </template>
                            <el-menu-item index="/wallet"><i></i>我的钱包</el-menu-item>
                            <el-menu-item index="/ServiceOrdering"><i></i>服务订购</el-menu-item>
            </el-submenu>
              <el-submenu index="8">
                    <template slot="title">
                        <i class="el-icon-money"></i>
                        <span>店铺管理</span>
                    </template>
                            <el-menu-item index="/ShopHome"><i></i>店铺主页</el-menu-item>
                            <el-menu-item index=""><i></i>店铺导航</el-menu-item>
            </el-submenu>
            </el-menu>
                  
    </template>
    <script>
    export default {
        data(){
            return{
                openeds: ['1','2','3','4','5','6','7','8'],
            }
        },
        created () {
      },
      beforeUpdate:function(){

    this.activeIndex = this.$route.matched[1].path

},
        methods:{
    
        },
        computed:{
        }
    }
    </script>
    <style scoped>

 .el-aside ul{       width: 199px; margin-bottom: 20px;}
 .el-aside li{text-align: left;}
 .el-aside span{text-align: right;}
 .el-submenu__title{padding: 0;}
 .el-submenu .el-menu-item{ min-width: 199px;}
    </style>
    <style>
  body > .el-container {margin-bottom: 40px;}
 .el-header, .el-footer {background-color: #fff;color: #333;text-align: center;line-height: 60px;}
 .el-header{margin-bottom: 20px;position: fixed;top: 0;width: 100%;z-index: 999;}
 .el-aside {margin-left: 20px;margin-right: 20px;color: #333;text-align: center;line-height: 200px;    background: #fff;    margin-top: 80px;}
 .el-main {background-color: #fff;color: #333; margin-top: 80px;}
 .el-menu-item.is-active i{width: 5px;height: 50px;background: blue;display: inline-block;position: absolute;top: 0px;left: 0;}
  .el-menu-item.is-active{background: #FBFBFB;}
    </style>
    
    