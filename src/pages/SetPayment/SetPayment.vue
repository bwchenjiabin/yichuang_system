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
            <el-steps :active="active" :align-center="align">
              <el-step title="1 配置业务域名" description></el-step>
              <el-step title="2 设置支付信息" description></el-step>
              <el-step title="3 完成" description></el-step>
            </el-steps>
            <div class="warrant">
              <div class="warrant_left">
                  <p class="l_title">需要登录微信工作平台将以下文件配置到对应位置</p>
                  
                  <div class="l_box" style="display: block;">
                      <p><span class="l_span">微信支付商户号：</span> <el-input v-model="input" placeholder="请输入内容"></el-input></p>
                      <p class="l_select" style="margin-top:25px;">
                          <router-link :to="{path:'/problem',query:{id:17}}"><a href="javascript:;" style="margin-right: 100px;">点击查看详细教程</a></router-link>
                      </p>
                  </div><br>
                  <div class="l_box" style="display: block;">
                      <p><span class="l_span">微信支付商户API密钥：</span> <el-input v-model="input1" placeholder="请输入内容"></el-input></p>
                      <p class="l_select" style="margin-top:25px;">
                          <router-link :to="{path:'/problem',query:{id:18}}"><a href="javascript:;" style="margin-right: 100px;">点击查看详细教程</a></router-link>
                      </p>
                  </div><br>
                  <div class="l_box" style="display: block;">
                      <p><span class="l_span">公众号APP ID：</span> <el-input v-model="input2" placeholder="请输入内容"></el-input></p>
                      <p class="l_select" style="margin-top:25px;">
                      </p>
                  </div><br>
                  <div class="l_box" style="display: block;">
                      <p><span class="l_span">公众号密钥：</span> <el-input v-model="input3" placeholder="请输入内容"></el-input></p>
                      <p class="l_select" style="margin-top:25px;">
                      </p>
                  </div><br>
                  
                  
                  <div class="l_box" style="display: block;">
                      <p><span class="l_span">支付授权目录(https):</span><el-button type="primary" @click="getdata">点击获取</el-button></p>
                      <p class="l_select" style="margin-top:25px;">
                          <router-link :to="{path:'/problem',query:{id:19}}"><a href="javascript:;" style="margin-right: 100px;">点击查看详细教程</a></router-link>
                      </p>
                      <br><br>
                      <p style="color:red" class="l_select">{{domainpath}}</p>
                  </div><br>
              </div>
              <div class="warrant_right">
                <p class="r_title">为什么需要配置业务域名？</p>
                 <p class="r_content" style="margin-bottom:10px;">
                  如不进行业务域名配置，用户在评论时会弹出安全提示：防欺诈，请勿输入密码。<br>
                  <span class="orange_text">
                      请务必正确配置！
                  </span>
                </p>
              </div>
            </div>
            <div class="warrant_footer">
                <div class="warrant_foot">
                    <el-checkbox v-model="checked" style="display:block;margin:auto;text-align:center" @change="change">我已完成上述配置</el-checkbox><br>
                    <div class="warran_button">
                        <router-link to="/config"><el-button plain>上一步</el-button></router-link>
                        <el-button type="primary" :disabled="disabled" @click="judge">下一步</el-button>
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
import {getdomain , editaccount} from 'api/userAjax';
export default {
  data() {
    return {
      align: true,
      radio:'1',
      radio1:'1',
      checked: false,
      input:'',
      input1:'',
      input2:'',
      input3:'',
      disabled:true,
      domainpath:'',
      Id: "",
      active:2
    };
  },
  created() {
    this.reload();
    this.Id = localStorage.getItem("ex2");
  },
  methods: {
    // 初始化回到顶部
    reload() {
      $("body,html").animate({ scrollTop: 0 }, 200);
    },
    change(){
      if (this.checked == true) {
        this.disabled = false;
      }else{
        this.disabled = true;
      }
    },
    getdata(){
      getdomain({accountId:this.Id}).then(res => {
        this.domainpath = res.data.data;     
        this.$message.success("业务域名获取成功，请前往微信公众号后台配置");      
      })
    },
    judge(){
      if (this.input == '' || this.domainpath == ''|| this.input1 == ''|| this.input2 == ''|| this.input3 == '') {
        this.$message.error('您还没有完成上述配置')
        return;
      }else{
        editaccount({accountId:this.Id,accountWechatId:this.input,accountWechatPaykey:this.input1,accountWechatAppid:this.input2,accountWechatAppsecret:this.input3}).then(res =>{
            if (res.data.code == "0000") {
              this.$message.success("完成");    
              this.active = 3  
              setTimeout (()=>{
                this.$router.push({path:'/accountSeting'})     
              },700);  
            }
        })
      }
    },
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
.l_select{
  padding-left: 150px;
}
.l_span{
    width: 150px;
    display: inline-block;
}
.r_title{
  font-size: 14px;
  color: #353535;
  margin-bottom: 30px;
}
.l_box{
    margin-top: 30px;
}
.l_box p{
    font-size:14px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
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
.l_title{
  font-size: 16px;
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