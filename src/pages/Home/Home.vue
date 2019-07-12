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
                                <h3>{{this.phone}}</h3>
                                <span class="bq">标准版</span>
                            </div>
                            <ul class="cont">
                                <li>
                                    <div class="dd">
                                        <img src="../../../static/img/矢量智能对象 拷贝 2@2x.png" alt="" class="imgs">
                                        <span>总用户（人）</span><br><br>
                                        <h3>{{this.number.peopleNumber}}</h3>
                                    </div>
                                    
                                </li>
                                <li>
                                    <div class="dd">
                                        <img src="../../../static/img/矢量智能对象@2x(1).png" alt="" class="imgs">
                                        <span>今日收入（元）</span><br><br>
                                        <h3>{{this.number.todaySturnover}}</h3>
                                    </div>
                                </li>
                                <li>
                                    <div class="dd">
                                        <img src="../../../static/img/矢量智能对象@2x(2).png" alt="" class="imgs">
                                        <span>总收入（元）</span><br><br>
                                        <h3>{{this.number.sturnover}}</h3>    
                                    </div>                      
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
import {Home} from 'api/userAjax';
    export default {
        data(){
            return{
                number:[],
                phone:'',
            }
        },
        created () {
            this.getdata();
            this.phone = localStorage.getItem('phone')
      },
        methods:{
        getdata() {
        Home(localStorage.getItem('ex2')).then(res => {
            this.number = res.data
            // console.log(res);
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
 .cont li{width: 300px;height: 200px;background:rgba(255,255,255,1);box-shadow:0px 0px 10px 0px rgba(20,85,250,0.08);float: left;margin-right: 20px;text-align: center;display: flex;align-items: center;justify-content: center;position: relative;}
 .bq{width: 60px;height: 24px;line-height: 20px;border-radius: 1px;text-align: center;border: 1px solid rgba(0, 101, 255, 1);color: #0065FF;font-size: 14px;margin-left: 10px;}
 .dd{margin-top: 70px;}.imgs{width: 60px;height: 60px;position: absolute;top: 20px;left: 120px;}
    </style>

    