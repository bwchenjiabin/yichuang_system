<template>
    <el-scrollbar style="height:100%">
       <div class="box">
        <el-header
      style="background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 20px -10px #000;">
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
        <el-main>
          <div class="headers">
            <i>
              <img src="../../../static/img/矢量智能对象_看图王.png" alt />
            </i>
            <div class="cont">
              <h4>{{name}}</h4>
              <br />
              <span style="width:400px;display:block">可用于存储空间、下载流量的结算，不支持提现</span>
            </div>
          </div>
          <div class="footer">
            <span class="Explain">
              商品价格：
              <p class="moneys">￥{{radioName}}.00</p>
            </span>
            <br />
            <br />
            <span class="Explain">
              选择：
              <el-radio-group v-model="radio1" @change="getmoney(item.id,item.money)" border v-for="(item,index) in commodity" :key="index">
                <el-radio-button  :label="item.id" >{{item.num}}{{Company}}</el-radio-button>
              </el-radio-group>
            </span>
          </div>
          <el-button type="primary" style="margin-left:148px;margin-bottom:50px" @click="openDetails()">立即购买</el-button>
          <div class="title">
            <i class="icon"></i>
            <span>商品详情</span>
          </div>
          <h4 class="names">产品介绍</h4>
          <div class="conts">
            <h5 class="conts-title">壹创币</h5>
            <br />
            <p>是壹创堂为您提供的一种 虚拟货币能力，可用于结算您在壹创堂平台使用的存储空间费用以及您的壹创店铺（移动端）下载流量费用。</p>
          </div>
          <div class="conts">
            <h5 class="conts-title">存储空间</h5>
            <br />
            <p>指您在壹创堂上传文件时所占用的服务器空间，含图片、音频、视频、直播回放等文件。</p>
          </div>
          <div class="conts">
            <h5 class="conts-title">下载流量</h5>
            <br />
            <p>指您的壹创堂在移动端，被访问并浏览时所产生的流量。单个用户多次访问某个文件时仅计算一次访问流量</p>
          </div>
          <br />
          <br />
          <br />
          <h4 class="names">产品计价</h4>
          <div class="conts">
            <h5 class="conts-title">创币资费</h5>
            <br />
            <ul>
              <li>1个壹创币=1个人民币，目前提供5种规格购买</li>
              <li>50个壹创币,50元</li>
              <li>100个壹创币,100元</li>
              <li>200个壹创币,200元</li>
              <li>500个壹创币,500元</li>
              <li>1000个壹创币,1000元</li>
            </ul>
          </div>
          <div class="conts">
            <h5 class="conts-title">存储空间与下载流量资费</h5>
            <br />
            <ul>
              <li>存储空间：0.6壹创币/GB/月，转化为日结算则为0.02壹创币/GB/日</li>
              <li>下载流量：0.9个壹创币/GB</li>
            </ul>
          </div>
          <br />
          <br />
          <br />
          <h4 class="names">注意事项</h4>
          <div class="conts">
          <ul>
            <li>1、壹创币一经购买，不提供退订/退款，请慎重购买。</li>
            <li>2、壹创堂将在壹创币余额不足且达到警告值时通知到您，建议您及时充值；如壹创币余额低于0，则将停止已欠费功能的服务，且暂停您下个月免费用量的赠送资格，需要交清后才能恢复赠送资格。</li>
            <li>
              3、欠费功服务
              ①因存储空间不足而欠费的，平台将通知到您并保留您的数据30天；如果在30天内没有续费，您在本平台存储的文件将会被销毁，且不可恢复。
              ②因下载流量不足而欠费的，平台将通知到您并实时停止您壹创店铺的访问权限。
            </li>
            <li>4、充值成功后用于店铺运营中所需要的壹创币消耗，余量消耗完毕时，将影响相关服务使用。</li>
          </ul>
          </div>
        </el-main>
      <!-- </el-container> -->
    </el-container>
  </div>
    </el-scrollbar>
</template>
<script>
import sidebar from "@/components/sidebar/sidebar.vue";
import Header from "@/components/Header/Header.vue";
import {insertOrder} from 'api/userAjax';
import {selectByType} from 'api/userAjax';
export default {
  data() {
    return {
      money:'',
      radio1:'',
      radioName:'',
      align:true,
      order:'',
      Id:'',
      commodity:[],
      name:'',
      productId:'',
      Company:''
    };
  },
  created() {
    this.getParams();
    this.getdata();
  },
  methods: {
    getmoney(id,val){
      this.productId = id;
      this.radioName = val;
    },
          //获取传值
    getParams() {
      var routerParams = this.$route.query.id;
      this.Id = routerParams;
    },
    openDetails(){
      insertOrder(localStorage.getItem('ex2'),this.productId).then(res => {
      this.order = res.data.data;
      let money = this.radioName
      let order = this.order
      if (res.data.code != '0000') {
        this.$message.error(res.data.msg)
        return;
      }
      this.$router.push({
        path: `/confirmorder`,
        query:{ money:money,order:order }
      });
      })
    },  
        getdata(){
      selectByType(this.Id).then(res => {
         this.commodity = res.data.data;
         this.name = res.data.data[0].name;
         this.radio1 = res.data.data[0].id;
         this.radioName = res.data.data[0].money
         this.productId = res.data.data[0].id
         if (this.Id == "4") {
          this.Company = "个"          
         }else if (this.Id == "5") {
           this.Company = "年"
         }
      })
    },  
    },
  //   insertOrders() {

  // },
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
  color: rgba(255, 0, 0, 1);
}
.conts-title {
  display: inline;
  font-size: 18px;
}
.Explain {
  padding-left: 100px;
  padding-bottom: 30px;
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.conts {
  padding: 30px 150px 10px 35px;
}
.imgText{
    font-size:18px;
font-family:PingFangSC-Medium;
font-weight:500;
color:rgba(153,153,153,1);
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
    padding: 10px 0 10px 0;
}
.names {
  padding-left: 35px;
  font-size: 20px;
  font-family: PingFangSC-Medium;
  color: rgba(51, 51, 51, 1);
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
  /* margin-top: 60px; */
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
  /* height: 800px; */
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
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>