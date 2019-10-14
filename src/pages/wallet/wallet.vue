<template>
  <el-scrollbar style="height:100%">
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
          <div class="headers">
            <i>
              <img src="../../../static/img/矢量智能对象_看图王.png" alt />
            </i>
            <div class="cont">
              <h4>我的壹创币</h4>
              <span>{{count}}</span>
            </div>
              <el-button type="primary" style="float:right;" @click="recharge">充值</el-button>
          </div>
          <div class="footer">
            <span class="Explain">使用说明</span>
            <br />
            <br />
            <ul class="ullist">
              <li>壹创币可用于非免费额度下的流量结算，壹创币不足时可通过充值购买</li>
              <li>壹创币与人名币比例为1：1，购买后的壹创币不支持提现。</li>
            </ul>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
  </el-scrollbar>
</template>
<script>
import sidebar from "@/components/sidebar/sidebar.vue";
import Header from "@/components/Header/Header.vue";
import {preview} from 'api/userAjax';

export default {
  data() {
    return {
      count:'',
      Id:4
    };
  },
  created() {
    this.getdata();
    this.reload();
  },
  methods: {
    // 查询商户
        getdata(){
      preview(localStorage.getItem('ex2')).then(res=>{
        this.count = res.data.balance
      })
    },

    recharge(){
        this.$router.push({
        path: `/Recharge`,
        query:{ id:this.Id}
      });
    },
    reload() {
     $('body,html').animate({scrollTop:0},200);
    }
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
.ullist {
  width: auto;
  padding-left: 120px;
}
.ullist li {
  padding: 10px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  list-style: disc;
  color: rgba(153, 153, 153, 1);
}
.cont {
  width: 150px;
  height: 80px;
  display: inline-block;
  padding-left: 30px;
  padding-right: 150px;
}
.headers i {
  display: inline-block;
  width: 50px;
  height: 50px;
}
.headers {
  /* margin-top: 60px; */
  padding: 20px 500px 60px 20px;
  display: flex;
  align-items: center;
}
.headers h4 {
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.Explain {
  padding-left: 100px;
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.headers span {
  font-size: 36px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 4, 4, 1);
}
.box {
  background: #f5f5f5;
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
 .el-scrollbar__wrap {
   overflow-x: hidden;
 }
</style>