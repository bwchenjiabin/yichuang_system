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