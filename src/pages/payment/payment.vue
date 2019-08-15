<template>
  <div class="box">
      <el-header
      style="background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 20px -10px #000;"
    >
      <div class="titles">
        <img src="../../../static/img/微信图片_20190610160537.png" alt />
      </div>
      <router-link to="/Home">
      <div class="heade-right">
        返回工作台
      </div>
      </router-link>
    </el-header>
    <el-container>
      <!-- <el-header  style="    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 20px -10px #000;">
        <Header></Header>
      </el-header> -->
      <!-- <el-container> -->
        <!-- <el-aside width="200px">
          <sidebar></sidebar>
        </el-aside> -->
        <el-main>
          <!-- <router-link to="/wallet">
            <span class="course" style="cursor: pointer;">我的钱包</span>
          </router-link>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
          <router-link to="/Recharge"><span class="imgText">充值</span></router-link>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
          <span class="imgText">确认订单</span>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;<span class="imgText">确认付款</span>
          <br />
          <br /> -->
          <br>
          <br>
            <el-steps :active="3" :align-center="align">
          <el-step title="确认订单信息" description=""></el-step>
          <el-step title="确认付款" description=""></el-step>
          <el-step title="购买成功" description=""></el-step>
       </el-steps><br><br><br>
          <div class="successOrder">
            <div class="orderheader">
                <i>
                    <img src="../../../static/img/微信图片_20190727085949.png" alt="">
                </i>
                <h4 class="names">付款成功！</h4>
                <p class="order-p1">订单号：{{order}}</p>
            </div>
          </div>
        </el-main>
      <!-- </el-container> -->
    </el-container>
  </div>
</template>
<script>
import sidebar from "@/components/sidebar/sidebar.vue";
import Header from "@/components/Header/Header.vue";
export default {
  data() {
    return {
        align:true ,
        order:''
    };
  },
  created() {
    this.getParams();
  },
  methods: {
        //获取传值
    getParams() {
      var routerParamsorder = this.$route.query.order;
      this.order = routerParamsorder
    },
  },
  components: {
    sidebar,
    Header
  }
};
</script>
<style scoped>
.course {
  font-size: 18px;
  font-family: PingFangSC-Medium;
  font-weight: 700;
  color: rgba(51, 51, 51, 1);
}
.footer {
  padding-bottom: 30px;
}
.moneys {
  display: inline-block;
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: #FB6E39;
  padding-left: 235px;
  margin-bottom: 50px
}
.imgText{
    font-size:18px;
font-family:PingFangSC-Medium;
font-weight:500;
color:rgba(153,153,153,1);
}
.payment{
  padding-top: 100px;
}
.payment img{
  width: 200px;
  height: 200px;
  padding-left: 190px;
}
.conts-title {
  display: inline;
  font-size: 18px;
}
.footerone{
    font-size:16px;
font-family:PingFangSC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
}
.order-p1{
    position: absolute;
    top: 65px;
    left: 75px;
    font-size:16px;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(153,153,153,1);
}
.order-p1 span{color: #FB6E39;}
.order-p2{
    position: absolute;
    top: 85px;
    left: 75px;
}
.footertwo{
    font-size:16px;
font-family:PingFangSC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
}
.footers{
   width: 100%;
   height:30px;
background:rgba(255,255,255,1);
border:1px solid rgba(238,238,238,1);
    padding: 10px;
}
.vx{    padding-left: 250px;
    font-size: 20px;
    font-family: PingFangSC-Medium;
    color: rgba(51, 51, 51, 1);}
.Explain {
  padding-left: 100px;
  padding-bottom: 30px;
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.ul-box{
    width:100%;
    height: 150px;
    text-align: center;
    line-height: 150px;
}
.ul-box ul{
    width: 350px;
    height: auto;
    margin: auto;
}
.ul-box li {
    list-style:disc;
    font-size:24px;
font-family:PingFangSC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
width: auto;
}
.successOrder{
    width: 100%;
    height: 150px;
}
.orderheader{
    width: 600px;
    height: 100%;
    margin:auto;
    display: flex;
    align-items: center;
    position: relative;
}
.conts {
  padding: 30px 150px 10px 35px;
}
.conts p {
  display: inline;
  font-size: 15px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.conts ul li{
    color:rgba(51,51,51,1);
    padding: 10px;
}
.names {
  padding-left: 30px;
  font-size: 20px;
  font-family: PingFangSC-Medium;
  color: rgba(51, 51, 51, 1);
  float: right;
  position: absolute;
  left: 45px;
  top: 10px;
}
.title p{
    display: inline;
    padding-left: 15px;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
}
.cont {
  height: 80px;
  display: inline-block;
  padding-left: 30px;
  line-height: 36px;
}
.headers i {
  display: inline-block;
  width: 50px;
  height: 50px;
}
.headers {
  margin-top: 60px;
  padding: 20px 500px 20px 20px;
  display: flex;
  align-items: center;
}
.headers h4 {
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.box {
  background: #f5f5f5;
}
.headers span {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.el-tabs__item {
  padding: 0 50px;
}
.el-input {
  width: auto;
}
.icon {
  width: 6px;
  height: 17px;
  background: blue;
  float: left;
  margin-top: 3px;
}
.title {
  width: auto;
  display: block;
  margin-bottom: 50px;
}
.title span {
  margin-left: 10px;
}
.search {
  margin-right: 20px;
}
.inp1 {
  margin-right: 40px;
}
.vip {
  margin-right: 40px;
}
.screen {
  margin-right: 40px;
}
.name {
  width: 111px;
  height: 40px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
  display: inline-block;
  position: absolute;
  top: 20px;
}
.img-box {
  width: 100px;
  height: 75px;
  display: inline-block;
}
.img-box img {
  width: 100%;
  height: 100%;
}
.money {
  width: 34px;
  height: 12px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 24px;
}
.number {
  width: 300px;
  text-align: left;
  display: inline-block;
}
.Order {
  width: 80px;
  display: inline-block;
}
.el-main {
  margin-top: 0;
  padding-left: 50px;
}
.content {
  width: 750px;
  height: auto;
  margin :auto;
  padding-left: 100px;
  padding: 10px;
  border: 1px solid rgba(238, 238, 238, 1);
}
.el-container {
  background: #fff;
  width: 1000px;
  height: 800px;
  margin: 80px auto;
}
.titles {
  color: rgba(16, 16, 16, 1);
  font-size: 28px;
  text-align: left;
  font-family: 方正兰亭黑-标准;
  width: 20%;
  float: left;
  padding-left: 200px;
}
.titles img {
  width: 130px;
  height: 30px;
  margin-top: 15px;
}
.heade-right{
  float: right;
  margin-right:300px; 
  color: #409EFF;
  font-size: 18px;
  cursor: pointer;
}
</style>