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
                  style="text-align: right; margin: 0;width: 55px;display: inline-block;float:right;"
                >
                  <el-button type="primary" size="mini" @click="recharge">续费</el-button>
                </div>
                <el-tag slot="reference" style="cursor:pointer">{{title}}</el-tag>
              </el-popover>
              <el-tag effect="plain" style="cursor:pointer">平台代收</el-tag>
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
                    <br />
                    <br />
                    <router-link to="/account"><el-button plain>提 现</el-button></router-link>
                  </div>
                </li>
              </ul>
            </div>
            <div class="tips">
              <i class="el-icon-bell"></i>
              <p>{{Notice.dicValue}}</p>
              <span>{{Notice.createtime}}</span>
            </div>
            <div class="overviews">
              <p>推荐功能</p>
              <ul class="conts">
                <li v-for="(item,index) in list" :key="index">
                  <router-link :to="item.url">
                    <i>
                      <img :src="item.img" alt />
                    </i>
                    <span>{{item.name}}</span>
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="activitys">
              <div class="img_box img_one">
                <img src="static/img/home_img1.png" alt />
              </div>
              <div class="img_box">
                <img src="static/img/home_img2.png" alt />
              </div>
            </div>
            <div class="problem">
              <p>常见问题</p>
              <ul>
                <router-link :to="{path:'/problem',query:{id:1}}">
                  <li>
                    <span class="round"></span>&nbsp;&nbsp;&nbsp; 壹创介绍
                  </li>
                </router-link>
                <router-link :to="{path:'/problem',query:{id:2}}">
                  <li>
                    <span class="round"></span>&nbsp;&nbsp;&nbsp;发布规范
                  </li>
                </router-link>
                <router-link :to="{path:'/problem',query:{id:7}}">
                  <li>
                    <span class="round"></span>&nbsp;&nbsp;&nbsp;如何创建直播
                  </li>
                </router-link>
                <router-link :to="{path:'/problem',query:{id:8}}">
                  <li>
                    <span class="round"></span>&nbsp;&nbsp;&nbsp;PPT直播操作流程
                  </li>
                </router-link>
              </ul>
              <ul>
                <router-link :to="{path:'/problem',query:{id:1}}">
                  <li>
                    <span class="round"></span>&nbsp;&nbsp;&nbsp; 壹创介绍
                  </li>
                </router-link>
                <router-link :to="{path:'/problem',query:{id:2}}">
                  <li>
                    <span class="round"></span>&nbsp;&nbsp;&nbsp;发布规范
                  </li>
                </router-link>
                <router-link :to="{path:'/problem',query:{id:6}}">
                  <li>
                    <span class="round"></span>&nbsp;&nbsp;&nbsp;店铺装修使用说明
                  </li>
                </router-link>
                <router-link :to="{path:'/problem',query:{id:10}}">
                  <li>
                    <span class="round"></span>&nbsp;&nbsp;&nbsp;如何使用课程
                  </li>
                </router-link>
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
      Notice: "",
      isExpire: false,
      visible: false,
      visibles: false,
      endtime: "",
      Id: 5,
      list: [
        {
          name: "订单流水",
          img: "static/img/icon_3.png",
          url: "/Order"
        },
        {
          name: "店铺装修",
          img: "static/img/icon_6.png",
          url: "/showHome"
        },
        {
          name: "我的资产",
          img: "static/img/icon_10.png",
          url: "/wallet"
        },
        {
          name: "用户反馈",
          img: "static/img/icon_5.png",
          url: "/feedback"
        },
        {
          name: "分类管理",
          img: "static/img/icon_1.png",
          url: "/classify"
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
        console.log(res)
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
        this.Notice = res.data.data[0];
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
  display: flex;
}
.conts {
  display: flex;
  flex-wrap: wrap;
  padding-left: 70px;
  margin-top: 30px;
}
.conts li {
  padding: 5px 0px 5px 0px;
  flex: 0 0 17%;
  height: 50px;
  font-size: 13px;
  line-height: 50px;
  padding-left: 15px;
  background-color: #fafafa;
  border-bottom: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
  display: flex;
  align-items: center;
}
.conts li a {
  color: #333;
  display: contents;
  width: 100%;
  height: 100%;
}
.conts li:hover {
  cursor: pointer;
  background-color: #f0f0f0;
}
.dd h3:hover {
  cursor: pointer;
  color: #105cfb;
}
.conts i {
  width: 30px;
  height: 30px;
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
  width: 100%;
  height: 170px;
  background: rgba(255, 255, 255, 1);
  float: left;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  /* align-items: center; */
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
.overviews {
  padding-bottom: 45px;
  float: left;
  width: 72%;
  margin-top: 30px;
  background: #fff;
  box-sizing: border-box;
}
.overviews p {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  padding: 20px 0 0 30px;
}
.problem {
  float: left;
  margin-top: 30px;
  background: #fff;
  width: 45%;
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
.problem ul a{
  color:  rgba(51, 51, 51, 1)
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
  width: 24%;
  margin-left: 3%;
  float: left;
  margin-top: 30px;
  background: #fff;
  padding-bottom: 20px;
}
.activitys {
  margin-top: 30px;
  margin-right: 2%;
  width: 24%;
  height: 220px;
  float: right;
}
.img_box {
  height: 90%;
  cursor: pointer;
}
.img_one {
  padding-bottom: 6%;
}
.img_box img {
  width: 100%;
  height: 100%;
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
  padding: 20px 0 30px 30px;
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

    