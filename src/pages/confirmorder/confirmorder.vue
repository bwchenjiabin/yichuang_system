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
          <router-link to="/wallet">
            <span class="course" style="cursor: pointer;">我的钱包</span>
          </router-link>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
          <router-link to="/Recharge"><span class="imgText">充值</span></router-link>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
          <span class="imgText">确认订单</span>
          <br />
          <br />
          <br>
          <!-- <div class="ul-box"> -->
        <!-- <ul>
            <li>您的订单已生成，请及时付款</li>
        </ul> -->
        <br>
        <el-steps :active="2" :align-center="align">
          <el-step title="选择商品" description=""></el-step>
          <el-step title="确认订单信息" description=""></el-step>
          <el-step title="确认付款" description=""></el-step>
          <el-step title="购买成功" description=""></el-step>
       </el-steps><br><br><br>
        <!-- </div> -->
         <div class="title">
            <i class="icon"></i>
            <span>支付方式</span>
            <p>*由于微信限额，购买超过3000元的服务建议您使用支付宝</p>
          </div><br>
          <!-- <el-button plain>支付宝</el-button>
          <el-button plain>微信</el-button><br><br><br> -->
            <el-radio-group v-model="radio1" @change="getmoney" border>
                <el-radio-button  label="支付宝" style="margin-left:30px;" >支付宝</el-radio-button>
                <el-radio-button  label="微信">微信</el-radio-button>
            </el-radio-group><br><br>
          <div class="title">
            <i class="icon"></i>
            <span>商品信息</span>
          </div>
          <el-table
      :data="tableData"
      style="width: 100%">
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column
        prop="date"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="价格"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="数量">
      </el-table-column>
        <el-table-column
        label="小计">
         <template slot-scope="scope">
            <span>{{scope.row.name*scope.row.address}}</span>
        </template>
      </el-table-column>
    </el-table><br>
    <div class="footers" style="line-height:30px;">
        <span class="footerone">合计</span>
        <span style="float:right;margin-right:500px;" class="footertwo">￥{{Id}}.00</span>
    </div><br><br>
     <!-- <router-link to="/confirmpayment"> -->
     <el-button type="primary" @click="openDetails">立即付款</el-button>
     <!-- </router-link> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import sidebar from "@/components/sidebar/sidebar.vue";
import Header from "@/components/Header/Header.vue";
import {pay} from 'api/userAjax';
export default {
  data() {
    return {
        tableData: [{
            date: '壹创币',
            name: '',
            address: '1',
            numbers:'200'
          }] ,
          radio1:'微信',
          moneytype:'',
          align:true,
          Id:'',
          order:'',
          url:'',
          time:'',
    };
  },
  created() {
    this.getParams();
  },
  methods: {
        getmoney(val){
        this.moneytype = val;
    },
        //获取传值
    getParams() {
      var routerParams = this.$route.query.money;
      var routerParamsorder = this.$route.query.order;
      this.Id = routerParams;
      this.order = routerParamsorder
      this.tableData[0].name = this.Id
    },

    openDetails(){
      pay(this.order).then(res => {
            if (res.data.code == '0000') {
            this.$message.success(res.data.data.msg)              
            }else{
            this.$message.error(res.data.msg)
              return;
            }
            this.url = res.data.data.codeUrl
            this.time = res.data.data.payStartTime
          this.$router.push({
        path: `/confirmpayment`,
        query:{codeUrl:this.url,money:this.Id,order:this.order,payStartTime:this.time}
      });
      })
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
.imgText{
    font-size:18px;
font-family:PingFangSC-Medium;
font-weight:500;
color:rgba(153,153,153,1);
}
.moneys {
  display: inline-block;
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 0, 0, 1);
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
</style>