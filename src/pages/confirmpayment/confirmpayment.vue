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
    <el-container >
      <!-- <el-header style="    background-color: rgba(255, 255, 255, 0.95);
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
          <span class="imgText">确认订单</span>
          &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;<span class="imgText">确认付款</span>
          <br />
          <br /> -->
          <br>
          <br>
           <el-steps :active="2" :align-center="align">
          <!-- <el-step title="选择商品" description=""></el-step> -->
          <el-step title="确认订单信息" description=""></el-step>
          <el-step title="确认付款" description=""></el-step>
          <el-step title="购买成功" description=""></el-step>
       </el-steps><br><br><br>
          <div class="successOrder">
            <div class="orderheader">
                <i>
                    <img src="../../../static/img/微信图片_20190727085949.png" alt="">
                </i>
                <h4 class="names">订单提交成功！</h4>
                <p class="order-p1">请您在提交订单后<span>{{time}}</span>内完成，否则将自动取消。</p>
                <p class="order-p2">订单号：{{order}} 收款方：山西壹创科技有限公司</p>
            </div>
          </div>
         <div class="payment">
            <h4 class="vx">微信支付</h4><br><br>
            <span class="moneys">￥{{money}}.00</span><br>
            <!-- <img src="../../../static/img/微信图片_20190611141523.jpg" alt=""> -->
            <qrcode-vue :value="url" :size="size" level="H" style="padding-left: 213px;width: 150px;float: left;">
            </qrcode-vue>
            <div class="imgfoot">
              <img src="../../../static/img/微信图片_20190731172529.png" alt="" style="float:left">
              <span style="float:right">请使用微信扫一扫<br>
              扫描二维码支付</span>
            </div>
            <div class="jc">
              <img src="../../../static/img/图层 3_看图王.png" alt="" style="float:right">

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
import QrcodeVue from 'qrcode.vue'
import {orderQuery} from 'api/userAjax';

export default {
  data() {
    return {
          time:'123456789',
          align:true,
          d:'',
          h:'',
          m:'',
          s:'',
          url:'',
          value: 'https://example.com',
          size: 150,
          money:'',
          order:'',
          time:'',
          times:'',
          mytimer: null,
          mytime:null,
    }
  },
  created() {
    this.getParams();
    this.countTime();
    this.orderStatus();
  },
  mounted(){
     this.mytimer = setInterval(this.orderStatus, 5000);
    this.mytime = setInterval(this.countTime,1000);
  },
  methods: {
      //获取传值
    getParams() {
      var routerParams = this.$route.query.codeUrl;
      var routerParamsmoney = this.$route.query.money;
      var routerParamsorder = this.$route.query.order;
      var routerParamstime = this.$route.query.payStartTime;
      this.url = routerParams;
      this.money = routerParamsmoney
      this.order = routerParamsorder
      this.times = Date.parse(routerParamstime)
    },
    countTime() {
                //当前
                var date = new Date();
                var now = date.getTime();
                //截止
                var end = this.times
                var leftTime = end - now;
                if (leftTime >= 0) {
                    this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
                    this.h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
                    this.m = Math.floor(leftTime / 1000 / 60 % 60);
                    this.s = Math.floor(leftTime / 1000 % 60);
                }
                this.time = this.h+'小时'+this.m+'分'+this.s+'秒'
            },
            //  定时查询订单状态
            orderStatus(){
              orderQuery(this.order).then(res=>{
                  if (res.data == "SUCCESS") {
                    window.clearInterval(this.mytimer)
                      this.$message.success("购买成功")
                      this.$router.push({
                      path: `/payment`,
                      query:{order:this.order}
                    });
                  }else if (res.data == "CLOSED") {
                    window.clearInterval(this.mytimer)
                    this.$message.error("订单已关闭")
                  }
              })
            },
  },
  components: {
    sidebar,
    Header,
    QrcodeVue
  }
};
</script>
<style scoped>
.jc{
    width: 270px;
    height: 270px;
    position: absolute;
    top: 138px;
    right: 150px;
}
.jc img{width: 100%;height: 100%;;}
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
  margin-bottom: 30px
}
.imgText{
    font-size:18px;
font-family:PingFangSC-Medium;
font-weight:500;
color:rgba(153,153,153,1);
}
.payment{
  padding-top: 100px;
  position: relative;
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
    top: 60px;
    left: 75px;
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
  height: 850px;
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
  height: 60px;
  line-height: 60px;
}
.imgfoot{
      width: 150px;
    height: auto;
    display: inline-block;
    position: absolute;
    bottom: -205px;
    left: 215px;
    font-size:13px;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(102,102,102,1);
}
</style>