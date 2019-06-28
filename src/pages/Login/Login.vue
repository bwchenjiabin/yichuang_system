<template>
    <div class="box">
        <div class="header">
            <div class="title">
                <i><img src="../../../static/img/微信图片_20190610160537.png" alt=""></i>
            </div>
        </div>     
        <div class="content">
           <div class="cont-tit">
                账号登录
           </div>
           <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
           <el-input placeholder="请输入密码" v-model="input2" show-password></el-input><br>
           <router-link to="/Home"><el-button type="primary">登录</el-button></router-link>
        </div><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <div class="footer">
                <p>©2018山西壹创科技有限公司《壹创堂隐私权政策》晋备ICP证：19003971号</p>
        </div>
    </div>    
</template>
<script>
export default {
    data(){
        return{
            input: '',
            input2:''
        }
    },
    created () {
  },
    methods:{

    }
}
</script>
<style scoped>
 *{padding: 0;margin: 0;}
 .box{background-color: rgba(255, 255, 255, 1);width: 100%;height: 100%;}
 .header{height: 100px;line-height: 100px;text-align: left;padding-left: 80px;}
 .title{color: rgba(16, 16, 16, 1);font-size: 28px;text-align: left;font-family: 方正兰亭黑-标准;}
 .content{width: 500px;height: 300px;background: #fff;margin: auto;padding: 50px 30px 50px 140px;margin-top: 100px;}
 .content .cont-tit{color: rgba(0, 0, 0, 1);font-size: 26px;text-align: left;font-family: SourceHanSansSC-bold;margin-bottom: 30px;width: 70%}
 .content .el-input{width: 70%;margin-bottom: 25px;}
 .content .el-button{width: 70%;height: 50px;}
 .footer p{color: rgba(153, 153, 153, 1);font-size: 14px;text-align: left;font-family: SourceHanSansSC-regular;text-align: center;}
</style>
