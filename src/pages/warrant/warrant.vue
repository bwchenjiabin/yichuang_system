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
            <h4 class="account_set">授权服务</h4>
            <br />
            <br />
            <br />
            <br />
            <el-steps :active="1" :align-center="align">
              <el-step title="1 授权服务号" description></el-step>
              <el-step title="2 配置业务域名" description></el-step>
              <el-step title="3 设置支付信息" description></el-step>
              <el-step title="4 验证支付信息" description></el-step>
              <el-step title="5 完成" description></el-step>
            </el-steps>
            <div class="warrant">
              <div class="warrant_left">
                  <p class="l_title"> 1.1 我已拥有微信认证服务号 </p>
                  <p class="l_select"><el-radio v-model="radio" label="1">是</el-radio></p>
                  <p class="l_select"><el-radio v-model="radio" label="2">否 <a href="javascript:;" style="color:#2a75ed;padding-left: 20px;">立即申请</a></el-radio></p><br>
                  <div class="l_box" style="display: block;">
                      <p class="l_title">1.2 此服务号已开通微信支付</p>
                      <p class="l_select"><el-radio v-model="radio1" label="1">是</el-radio></p>
                      <p class="l_select"><el-radio v-model="radio1" label="2">否，立即开通</el-radio></p>
                  </div><br>
                  <div class="l_box" style="display: block;">
                      <p class="l_title"> 1.3授权服务号 (已授权)</p>
                      <p class="l_select">微信公众号：秒到米  </p>
                      <p class="l_select">账户类型：已认证服务号  </p>
                  </div><br><br>
                  <el-button type="primary">立即授权</el-button>
              </div>
              <div class="warrant_right">
                <p class="r_title">您授权的服务号必须满足以下条件：</p>
                <p class="r_content" style="margin-bottom:10px;">
                  1.该服务号为“已认证服务号”
                  <a href="javascript:;">如何认证微信服务号？</a>
                </p>
                <p class="r_content" style="margin-bottom:30px;">
                  2.该服务号已开通“微信支付”
                  <a href="javascript:;">如何开通微信支付？</a>
                </p>
                <p class="r_content" style="margin-bottom:30px;">
                  为了保证所有功能正常，授权公众号时清保持默认选择，把权限统一授权给壹创堂。
                </p>
                 <p class="r_content" style="margin-bottom:10px;">
                  授权服务号后，您的用户信息将会发生变更。
                  <br>
                  <span class="orange_text">您一旦授权自己的服务号后不可更换。</span>
                </p>
              </div>
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
export default {
  data() {
    return {
      align: true,
      radio:'1',
      radio1:'1',
    };
  },
  created() {
    this.reload();
  },
  methods: {
    // 初始化回到顶部
    reload() {
      $("body,html").animate({ scrollTop: 0 }, 200);
    }
  },
  components: {
    sidebar,
    Header
  }
};
</script>
    <style scoped>
.box {
  background: #f5f5f5;
}
h3 {
  display: inline;
}
.warrant{
  min-height: 400px;
  font-size: 14px;
  margin-top: 30px;
  margin-left: 5px;
  padding: 40px;
}
.l_select{
  padding-left: 20px;
}
.r_title{
  font-size: 14px;
  color: #353535;
  margin-bottom: 30px;
}

.l_title{
  font-size: 14px;
  font-weight: 700;
  color: #353535;
  margin: 0 0 10px;
}
.r_content{
  font-size: 14px;
  color: #353535;
}
.warrant_left{
  float: left;
  width: 55%;
  border-right: 1px solid #dedede;
  min-height: 400px;
}
.warrant_left p{
  margin: 0 0 10px;
}
.orange_text{
  color: #fb6161;
}
.warrant_right{
  padding-left: 20px;
  width: 40%;
  float: left;
}
.cont li {
  width: 300px;
  height: 200px;
  background: #f4f4f4 100%;
  float: left;
  margin-right: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
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
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-steps--horizontal {
  padding: 0 150px;
}
.account_set {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
</style>