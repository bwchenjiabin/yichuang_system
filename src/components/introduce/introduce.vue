<template>
  <div class="box">
    <div class="title_box">
      <h2>壹创介绍</h2>
    </div>
    <div class="content">
        <font color="#3a3c4c" size="2" face="黑体">
            <p>
              在<span style="font-weight: 700; font-size:16px">【支付授权目录(https)】</span>一栏中，点击右边的<span style="font-weight: 700; font-size:15px">【获取】</span>
              按钮，把<span style="font-weight: 700; font-size:15px">壹创店铺的支付授权目录</span>完整地复制下来， <span style="font-weight: 700; font-size:15px">完成此步骤之后请不要关闭壹创管理后台页面。
              </span>
            </p><br><br>
            <p>
              Step 1：返回您的<span style="font-weight: 700; font-size:16px">微信支付商户平台</span>页面，点击顶部菜单栏的<span style="font-weight: 700; font-size:16px">【产品中心】</span>
              ，点击左侧边栏的<span style="font-weight: 700; font-size:16px">【开发配置】</span>
            </p><br>
            <p>
              <img src="http://yckt.yichuangketang.com:8081/help/23.png" alt="" style="max-width:100%;">
            </p><br>
            <p>
              Step 2: 在<span style="font-weight: 700; font-size:16px">【支付配置】</span>一栏，点击<span style="font-weight: 700; font-size:16px">【公众号支付】-【支付授权目录】</span>
              旁边的<span style="font-weight: 700; font-size:16px">【添加】</span>按钮，浏览器自动弹出添加窗口，在目录头部的下拉菜单中选择
              <span style="font-weight: 700; font-size:16px"> https:// </span>类型，然后粘贴刚刚复制的
              <span style="font-weight: 700; font-size:16px">壹创店铺的支付授权目录</span>，点击
              <span style="font-weight: 700; font-size:16px">【添加】</span>确认。
            </p><br>
            <p>
              <span style="font-weight: 700; font-size:16px">特别注意：请务必在目录头部的下拉菜单中选择 https:// 类型，不要选择http://。</span>
            </p><br>
             <p>
              <img src="http://yckt.yichuangketang.com:8081/help/24.png" alt="" style="max-width:100%;">
            </p><br>
            <p>
              Step 3：返回壹创管理台，点击
              <span style="font-weight: 700; font-size:16px">【我已完成上述配置】</span>
              ，并点击<span style="font-weight: 700; font-size:16px">【下一步】</span>，完成壹创店铺的支付设置配置流程。
            </p><br>
        </font>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
};
</script>
<style lang='scss' scoped>
.title_box {
  height: auto;
  margin: 30px 30px 10px;
  width: auto;
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 10px;
}
.box {
  width: 700px;
  padding: 20px;
  margin: 60px auto;
}
.content {
  width: 95%;
  font-size: 16px;
  text-align: left;
  font-size: 14px;
  line-height: 1.6;
  padding: 20px;
  overflow: auto;
  width: 100%;
  background-color: #fff;
}
</style>