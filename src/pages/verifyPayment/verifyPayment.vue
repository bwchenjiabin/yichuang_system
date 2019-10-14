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
            <el-steps :active="4" :align-center="align">
              <el-step title="1 授权服务号" description></el-step>
              <el-step title="2 配置业务域名" description></el-step>
              <el-step title="3 设置支付信息" description></el-step>
              <el-step title="4 验证支付信息" description></el-step>
              <el-step title="5 完成" description></el-step>
            </el-steps>
            <div class="warrant">
              <div class="warrant_left">
                  <div class="payment">
                    <h4 class="vx">微信商户号：</h4><br><br>
                    <qrcode-vue :value="url" :size="size" level="H" style="padding-left: 213px;width: 150px;float: left;">
                    </qrcode-vue>
                    <div class="imgfoot">
                    <p>
                            扫描上方二维码支付0.001元，此费用为支
付信息配置是否正确所用，不予退还
                        </p>
                    </div>
                </div>
              </div>
              <div class="warrant_right">
                <p class="r_title">
                            支付信息配置正确：
扫码后点击支付按钮可正常输入密码支付
                        </p>
                 <p class="r_content" style="margin-bottom:10px;">
                            支付信息有误：
点击支付后提示长按二维码支付——请检查授权目录配置是否有误
                </p>
              </div>
            </div>
            <div class="warrant_footer">
                <div class="warrant_foot">
                    <el-checkbox v-model="checked" style="display:block;margin:auto;text-align:center">我已完成上述配置</el-checkbox><br>
                    <div class="warran_button">
                        <router-link to="/SetPayment"><el-button plain>上一步</el-button></router-link>
                        <el-button type="primary">下一步</el-button>
                    </div>
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
import QrcodeVue from 'qrcode.vue'
export default {
  data() {
    return {
      align: true,
      radio:'1',
      radio1:'1',
      checked: false,
      url:'斌哥666',
      size:150,
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
    Header,
    QrcodeVue
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
.warran_button{
    text-align: center;
}
.warrant{
  min-height: 400px;
  font-size: 14px;
  margin-top: 30px;
  margin-left: 5px;
  padding: 40px;
}
.r_title{
  font-size: 14px;
  color: #353535;
  margin-bottom: 30px;
}
.warrant_footer{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.warrant_foot{
    width: 30%;
    margin: 0 auto;
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
.payment{
  padding-top: 100px;
  position: relative;
}
.vx{    
    padding-left: 250px;
    font-size:14px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
}
.imgfoot{
    width: 250px;
    height: auto;
    display: inline-block;
    position: absolute;
    bottom: -240px;
    left: 170px;
    font-size:13px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
}
</style>