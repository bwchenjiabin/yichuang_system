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
            <h4 class="account_set">支付设置</h4>
            <br />
            <br />
            <br />
            <div class="have">
              <div class="have_left">
                <h3 class="have_tit">微信支付-自有账户</h3>
                <p>前提条件：你需要在微信公众平台申请开通“维信认证号”，且此服务号需要向微信申请开通“微信支付权限”</p>
                <p>你可以在此配置，使用自己的微信支付。收入直接进入你的微信支付对应的账号。微信将收取每笔0.6%的交易手续费。</p>
                <br />
                <a href="javascript:;">查看配置教程</a>
              </div>
              <div class="have_right">
                <router-link to="/warrant"><el-button type="primary">立即配置</el-button></router-link>
              </div>
            </div>
            <div class="have">
              <div class="have_left">
                <h3 class="have_tit">微信支付-壹创堂知识助手账户</h3>
                <p>你的店铺收入可以暂存于“壹创知识助手”微信支付对应的账户，你可以随时向壹创堂发起提现申请；</p>
                <p>微信收取0.6%交易手续费，铜鼓壹创堂完成代缴；</p>
                <p>提现人工审核周期，当天18点前申请提现，3个工作日到账，实际到账时间以微信入账时间为准。</p>
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
    return {};
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
.have {
  height: 160px;
  background: rgba(250, 250, 250, 1);
  border-radius: 4px;
  line-height: 25px;
  padding: 30px 0 0 30px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.have p {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.account_set {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.have_tit {
  display: inline-block;
  margin-bottom: 10px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.have_left {
  height: 100%;
  width: 70%;
  float: left;
}
.have_right {
  width: 30%;
  float: left;
  display: flex;
  justify-content: center;
}
</style>