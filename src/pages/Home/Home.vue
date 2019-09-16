<template>
  <el-scrollbar style="height:100%">
    <div class="box">
      <el-container>
        <el-header
          style="    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 20px -10px #000;"
        >
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
                v-if="isExpire === true"
              >
                <p style="display: inline;">{{this.title}}已到期，店铺已打烊</p>
                <div
                  style="text-align: right; margin: 0;width: 55px;display: inline-block;float: right;"
                >
                  <el-button type="primary" size="mini" @click="recharge">续费</el-button>
                </div>
                <el-tag slot="reference" type="danger" style="cursor:pointer">已到期</el-tag>
              </el-popover>
              <el-popover
                placement="bottom-start"
                width="380"
                trigger="hover"
                transition="el-zoom-in-top"
                v-model="visibles"
                v-if="isExpire === false"
              >
                <p
                  style="display: inline;"
                >已订购{{this.title}}，有效期至&nbsp;&nbsp;:&nbsp;&nbsp;{{endtime}}</p>
                <div
                  style="text-align: right; margin: 0;width: 55px;display: inline-block;float: right;"
                >
                  <el-button type="primary" size="mini" @click="recharge">续费</el-button>
                </div>
                <el-tag slot="reference" style="cursor:pointer">{{title}}</el-tag>
              </el-popover>
              <el-tag effect="plain">平台代收</el-tag>
            </div>
            <div class="overview">
              <p>数据概览</p>
              <ul class="cont">
                <li>
                  <div class="dd">
                    <span>今日新增收入（元）</span>
                    <br />
                    <br />
                    <h3>{{this.number.todaySturnover}}</h3>
                  </div>
                </li>
                <li>
                  <div class="dd">
                    <span>新用户</span>
                    <br />
                    <br />
                    <h3>{{this.number.newPeopleNum}}</h3>
                  </div>
                </li>
                <li>
                  <div class="dd">
                    <span>总用户（人）</span>
                    <br />
                    <br />
                    <h3>{{this.number.peopleNumber}}</h3>
                  </div>
                </li>
                <li>
                  <div class="dd">
                    <span>总收入（元）</span>
                    <br />
                    <br />
                    <h3>{{this.number.sturnover}}</h3>
                  </div>
                </li>
                <li>
                  <div class="dd">
                    <span>可提现金额（元）</span>
                    <br />
                    <br />
                    <h3>{{this.number.platformBalance}}</h3>
                  </div>
                </li>
              </ul>
            </div>
            <div class="tips">
              <i class="el-icon-bell"></i>
              <p>{{Notice.dicValue}}</p>
              <span>{{Notice.createtime}}</span>
            </div>
            <div class="overview">
              <p>常用功能</p>
              <ul class="conts">
                <li v-for="(item,index) in list" :key="index">
                  <i>
                    <img :src="item.img" alt />
                  </i>
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
            <div class="problem">
              <p>常见问题</p>
              <ul>
                <li>
                  <span class="round"></span>&nbsp;&nbsp;&nbsp; 如何发布小程序
                </li>
                <li>
                  <span class="round"></span>&nbsp;&nbsp;&nbsp;为什么很多时候轮播图更换不了
                </li>
                <li>
                  <span class="round"></span>&nbsp;&nbsp;&nbsp;如何发布小程序
                </li>
                <li>
                  <span class="round"></span>&nbsp;&nbsp;&nbsp;如何发布小程序
                </li>
              </ul>
              <ul>
                <li>
                  <span class="round"></span>&nbsp;&nbsp;&nbsp;如何发布小程序
                </li>
                <li>
                  <span class="round"></span>&nbsp;&nbsp;&nbsp;为什么很多时候轮播图更换不了
                </li>
                <li>
                  <span class="round"></span>&nbsp;&nbsp;&nbsp;如何发布小程序
                </li>
                <li>
                  <span class="round"></span>&nbsp;&nbsp;&nbsp;如何发布小程序
                </li>
              </ul>
            </div>
            <div class="activity">
              <p>近期活动</p>
              <ul>
                <li>
                  <span class="round"></span>&nbsp;&nbsp;&nbsp;如何发布小程序
                </li>
                <li>
                  <span class="round"></span>&nbsp;&nbsp;&nbsp;为什么很多时候轮播图更换不了
                </li>
                <li>
                  <span class="round"></span>&nbsp;&nbsp;&nbsp;如何发布小程序
                </li>
                <li>
                  <span class="round"></span>&nbsp;&nbsp;&nbsp;如何发布小程序
                </li>
              </ul>
            </div>
          </el-main>
          <router-view></router-view>
        </el-container>
      </el-container>
    </div>
  </el-scrollbar>
</template>
    <script>
import sidebar from "@/components/sidebar/sidebar.vue";
import Header from "@/components/Header/Header.vue";
import { Home } from "api/userAjax";
import { preview } from "api/userAjax";
import { Notice } from "api/userAjax";

export default {
  data() {
    return {
      number: [],
      phone: "",
      title: "",
      Notice:'',
      isExpire: false,
      visible: false,
      visibles: false,
      endtime: "",
      Id: 5,
      list: [
        {
          name: "发布内容",
          img: "../../../static/img/icon_4.png"
        },
        {
          name: "轮播导航",
          img: "../../../static/img/icon_7.png"
        },
        {
          name: "订单流水",
          img: "../../../static/img/icon_3.png"
        },
        {
          name: "店铺装修",
          img: "../../../static/img/icon_6.png"
        },
        {
          name: "我的资产",
          img: "../../../static/img/icon_10.png"
        },
        {
          name: "评论管理",
          img: "../../../static/img/icon_2.png"
        },
        {
          name: "发票管理",
          img: "../../../static/img/icon_8.png"
        },
        {
          name: "群发消息",
          img: "../../../static/img/icon_9.png"
        },
        {
          name: "用户反馈",
          img: "../../../static/img/icon_5.png"
        },
        {
          name: "分类管理",
          img: "../../../static/img/icon_1.png"
        }
      ]
    };
  },
  created() {
    this.reload();
    this.getdata();
    this.getdatas();
    this.getNotice();
    this.phone = localStorage.getItem("phone");
    this.title = localStorage.getItem("accountType");
  },
  methods: {
    getdata() {
      Home(localStorage.getItem("ex2")).then(res => {
        this.number = res.data;
      });
    },
    // 展示
    getdatas() {
      preview(localStorage.getItem("ex2")).then(res => {
        this.endtime = res.data.expiretime;
        this.isExpire = res.data.expire;
      });
    },
    //公告
    getNotice() {
      Notice().then(res => {
        this.Notice = res.data.data[0]
      });
    },
    reload() {
      $("body,html").animate({ scrollTop: 0 }, 200);
    },
    recharge() {
      this.$router.push({
        path: `/Recharge`,
        query: { id: this.Id }
      });
    }
  },
  components: {
    sidebar,
    Header
  }
};
</script>
    <style scoped>
h3 {
  display: inline;
}
.title {
  padding: 20px;
  background: #fff;
}
.cont {
  display: inline-block;
}
.conts {
  display: flex;
  flex-wrap: wrap;
  padding-left: 75px;
}
.conts li {
  flex: 0 0 20%;
  height: 50px;
  padding-bottom: 15px;
  padding-top: 15px;
  line-height: 50px;
}
.conts li:hover {
  cursor: pointer;
}
.dd h3:hover {
  cursor: pointer;
  color: #105cfb;
}
.conts i {
  float: left;
  width: 40px;
  height: 40px;
}
.conts i img {
  width: 100%;
  height: 100%;
}
.conts span {
  padding-left: 20px;
}
.el-main {
  padding: 0;
}
.cont li {
  width: 250px;
  height: 170px;
  background: rgba(255, 255, 255, 1);
  float: left;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.bq {
  width: 60px;
  height: 24px;
  line-height: 20px;
  border-radius: 1px;
  text-align: center;
  border: 1px solid rgba(0, 101, 255, 1);
  color: #0065ff;
  font-size: 14px;
  margin-left: 10px;
}
.imgs {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 20px;
  left: 120px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-main {
  background: #f5f5f5;
}
.overview {
  margin-top: 30px;
  background: #fff;
  box-sizing: border-box;
}
.problem {
  margin-top: 30px;
  background: #fff;
  width: 65%;
  float: left;
  padding-bottom: 20px;
}
.activity ul li {
  padding: 10px 10px 10px 90px;
  width: 100%;
  display: block;
  font-size: 13px;
  cursor: pointer;
}
.activity ul {
  display: inline-block;
}
.problem ul {
  width: 35%;
  display: inline-block;
}
.problem ul li {
  padding: 10px 10px 10px 90px;
  width: 100%;
  display: inline-block;
  font-size: 13px;
  cursor: pointer;
}
.problem p {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  padding: 20px 0 0 30px;
}
.activity {
  width: 30%;
  float: right;
  margin-left: 30px;
  margin-top: 30px;
  background: #fff;
  padding-bottom: 20px;
}
.activity p {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  padding: 20px 0 0 30px;
}

.overview p {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  padding: 20px 0 0 30px;
}
.tips {
  padding: 20px 20px 20px 30px;
  background: #fff;
  margin-top: 30px;
  display: flex;
  align-items: center;
}
.tips p {
  display: inline;
  padding-left: 50px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.tips span {
  display: inline;
  flex: 1;
  text-align: right;
  padding-right: 50px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.el-icon-bell {
  font-size: 25px;
}
.round {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #e6e6e6;
  display: inline-block;
}
</style>

    