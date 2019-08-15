<template>
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
                            <div class="title">
                                <h3>{{this.phone}}</h3>
                                         <el-popover
                                            placement="bottom-start"
                                            width="250"
                                            trigger="hover"
                                            transition="el-zoom-in-bottom"
                                            v-model="visible"
                                            v-if="isExpire === true">
                                              <p style="display: inline;">{{this.title}}已到期，店铺已打烊</p>
                                            <div style="text-align: right; margin: 0;width: 55px;display: inline-block;float: right;">
                                                <el-button type="primary" size="mini" @click="recharge">续费</el-button>
                                            </div>
                                            <el-tag slot="reference"  type="danger" style="cursor:pointer" >已到期</el-tag>                                            
                                        </el-popover>
                                       <el-popover
                                            placement="bottom-start"
                                            width="380"
                                            trigger="hover"
                                            transition="el-zoom-in-top"
                                            v-model="visibles">
                                              <p style="display: inline;" >已订购{{this.title}}，有效期至&nbsp;&nbsp;:&nbsp;&nbsp;{{endtime}} </p>
                                            <div style="text-align: right; margin: 0;width: 55px;display: inline-block;float: right;">
                                                <el-button type="primary" size="mini" @click="recharge">续费</el-button>
                                            </div>
                                            <el-tag slot="reference" style="cursor:pointer">{{title}}</el-tag>
                                        </el-popover>
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
                        <router-view></router-view>
                    </el-container>
                </el-container>
        </div>    
    </template>
    <script>
import sidebar from '@/components/sidebar/sidebar.vue'
import Header from '@/components/Header/Header.vue'
import {Home} from 'api/userAjax';
import {preview} from 'api/userAjax';

    export default {
        data(){
            return{
                number:[],
                phone:'',
                title:'',
                isExpire:false,
                visible: false,
                visibles: false,
                endtime:'',
                Id:5,
            }
        },
        created () {
            this.reload();
            this.getdata();
            this.getdatas();
            this.phone = localStorage.getItem('phone')
            this.title = localStorage.getItem('accountType');
      },
        methods:{
        getdata() {
        Home(localStorage.getItem('ex2')).then(res => {
            this.number = res.data
      })
    },
            // 展示
        getdatas () {
        preview(localStorage.getItem('ex2')).then(res => {
          this.endtime = res.data.expiretime
          this.isExpire = res.data.expire
            })
        },
            reload() {
     $('body,html').animate({scrollTop:0},200);
    },
            recharge(){
        this.$router.push({
        path: `/Recharge`,
        query:{id:this.Id}
      });
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
 .cont li{width: 300px;height: 200px;background:rgba(255,255,255,1);box-shadow:0px 0px 10px 0px rgba(20,85,250,0.08);float: left;margin-right: 20px;text-align: center;display: flex;align-items: center;justify-content: center;position: relative;}
 .bq{width: 60px;height: 24px;line-height: 20px;border-radius: 1px;text-align: center;border: 1px solid rgba(0, 101, 255, 1);color: #0065FF;font-size: 14px;margin-left: 10px;}
 .dd{margin-top: 70px;}.imgs{width: 60px;height: 60px;position: absolute;top: 20px;left: 120px;}
    </style>

    