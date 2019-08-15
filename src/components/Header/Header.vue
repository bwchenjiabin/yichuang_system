<template>
    <div class="header">
        <div class="title">
            <img src="../../../static/img/微信图片_20190610160537.png" alt="">
        </div> 
        <div class="info">
            <div class="photo">
            </div>
            <span class="phone">{{this.phone}}</span>
            <!-- <el-tag type="danger"  @click="open2" style="cursor:pointer;" v-if="isExpire == false">已到期</el-tag> -->
            <el-tag style="cursor:pointer;">{{title}}</el-tag>
            <div class="quit" @click="getdata()">退出登录</div>
        </div>
    </div>   
</template>
    <script>
import qs from 'qs';
import {tuichu} from 'api/userAjax';
    export default {
        data(){
            return{
                phone:'',
                portrait:'',
                title:'标准版',
                isExpire:''
            }
        },
        created () {
           this.phone = localStorage.getItem('phone')
           this.portrait = localStorage.getItem('portrait')
           this.title = localStorage.getItem('accountType');
           this.isExpire = localStorage.getItem('isExpire');
      },
        methods:{
        open2() {
        this.$notify({
          title: '提示',
          message: this.title+'已到期，店铺已打烊',
          type: 'warning'
        });
      },
        getdata() {

        tuichu().then(res => {
        localStorage.removeItem('ex2');    
        this.$router.push({
            path: `/`
        });
        this.$message.success('退出成功')
      })
    },
        }
    }
    </script>
    <style scoped>
 .header{text-align: left;padding-left: 80px;    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 20px -10px #000;}
 .title{color: rgba(16, 16, 16, 1);font-size: 28px;text-align: left;font-family: 方正兰亭黑-标准;width: 20%;float: left;}
 .title img{width: 130px;height: 30px;margin-top: 15px;}
 .info{float: right;margin-right: 100px;}
 .photo{width: 30px;height: 30px;margin-top: 10px; color: rgba(51, 51, 51, 1);font-size: 16px;font-family: SourceHanSansSC-regular;position: absolute;}
 .photo img{width: 100%;height: 100%;border-radius: 50%;}
 .quit{cursor:pointer; display: inline;padding-left: 15px;border-left: 1px solid #ccc;color: #0065FF;font-size: 16px}.phone{padding-right: 20px;margin-left: 40px;font-size:18px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
 .bq{border-radius: 1px;text-align: center;border: 1px solid rgba(238, 238, 238, 1);color:rgba(51,51,51,1);font-size: 16px;font-family: 方正兰亭黑-标准;margin-right: 10px;    background: rgba(255,255,255,1);border: 2px solid rgba(238,238,238,1);padding: 2px;}
  body > .el-container {margin-bottom: 40px;}
 .el-header, .el-footer {background-color: #fff;color: #333;text-align: center;line-height: 60px;}
 .el-header{margin-bottom: 20px;width: 100%;position: fixed;}
 .el-aside {margin-left: 20px;margin-right: 20px;background-color: #D3DCE6;color: #333;text-align: center;line-height: 200px;}
 .el-main {background-color: #E9EEF3;color: #333;text-align: center;line-height: 160px;}


    </style>
    
    