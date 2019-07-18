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
                            <h4>店铺会员</h4><br><br>
                            <span>会员名称&nbsp;&nbsp;&nbsp;</span> <el-input placeholder="请输入内容" v-model="input" clearable class="inpp"></el-input>&nbsp;<i class="el-icon-edit"></i><br><br>
                            <span>年卡价格&nbsp;&nbsp;&nbsp;</span>
                            <!-- <i class="icon-money">￥</i> -->
                            <el-input placeholder="请输入内容" v-model="inputt" clearable id="inp2"></el-input>&nbsp;<i class="el-icon-edit"></i><br><br><br><br>
                            <el-button type="primary"  @click="vips();">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;保存&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                        </el-main>
                    </el-container>
            </el-container>
        </div>    
    </template>
    <script>
import sidebar from '@/components/sidebar/sidebar.vue'
import Header from '@/components/Header/Header.vue'
import {vip} from 'api/userAjax';
import {preview} from 'api/userAjax';

    export default {
        data(){
            return{
                    input:'',
                    inputt:''
                }
            },
        created () {
            this.getdata();
      },
        methods:{

            //修改店铺会员
      vips(){
      vip(localStorage.getItem('ex2'),this.input,this.inputt).then(res => {
           console.log(res)
        })
      },

      getdata(){
         preview(localStorage.getItem('ex2')).then(res => {
             this.input = res.data.memberName
             this.inputt = res.data.memberPrice
           console.log(res);
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
 .el-tabs__item{padding: 0 50px;}.el-input{width: auto;}.icon{width: 6px;height: 17px;background: blue;float: left;margin-top: 3px;}
 .title{width: auto;display: block}.title span{margin-left: 10px;}
 .icon-money{width: 30px;height: 40px;font-size:16px;font-family:PingFangSC-Medium;font-weight:500;color:rgba(51,51,51,1);text-align: center;line-height: 40px;display: inline-block;background:rgba(238,238,238,1);border:1px solid rgba(238,238,238,1);margin-left: 18px;}
 /* .inpp{margin-right: 30px;} */
</style>