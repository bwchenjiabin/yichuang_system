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
              <!-- <el-step title=" 授权服务号" description></el-step> -->
              <el-step title="1 配置业务域名" description></el-step>
              <el-step title="2 设置支付信息" description></el-step>
              <el-step title="3 完成" description></el-step>

              <!-- <el-step title="3 验证支付信息" description></el-step> -->
            </el-steps>
            <div class="warrant">
              <div class="warrant_left">
                  <p class="l_title">需要登录微信工作平台将以下文件配置到对应位置</p>
                  
                  <div class="l_box" style="display: block;">
                      <p><span>业务域名文件：</span> 登录微信公众号后台下载业务域名文件，在此上传</p>
                      <p class="l_select" style="margin-top:25px;">
                          <router-link :to="{path:'/problem',query:{id:15}}"><a href="javascript:;" style="margin-right: 100px;">点击查看详细教程</a></router-link>
                          <!-- <el-button type="primary">选择文件</el-button> -->
                            <el-upload
                              class="upload-demo"
                              action="http://192.168.0.203:8081/upload"
                              :before-remove="beforeRemove"
                              :on-success="handleAvatarSucces"
                              :limit="1"
                              :on-exceed="handleExceed"
                              accept=".txt">
                              <el-button type="primary">选择文件</el-button>
                            </el-upload>
                      </p>
                  </div><br>
                  <div class="l_box" style="display: block;">
                      <p><span>业务域名：</span> 点击获取业务域名，登录微信公众号后台填写保存</p>
                      <p class="l_select" style="margin-top:25px;">
                          <router-link :to="{path:'/problem',query:{id:16}}"><a href="javascript:;" style="margin-right: 100px;">点击查看详细教程</a></router-link>
                          <el-button type="primary" @click="getdata">点击获取</el-button>
                      </p><br><br><br>
                      <p style="color:red" class="l_select">{{domainpath}}</p>
                  </div><br>
              </div>
              <div class="warrant_right">
                <p class="r_title">为什么需要配置业务域名？</p>
                 <p class="r_content" style="margin-bottom:10px;">
                  
                            如不进行业务域名配置，用户在评论时会弹出安全提示：防欺诈，请勿输入密码。
                        
                  <br>
                  <span class="orange_text">您一旦授权自己的服务号后不可更换。</span>
                </p>
                <p class="r_content" style="margin-bottom:30px;">
                  提示：请勿重复操作
                </p>
              </div>
            </div>
            <div class="warrant_footer">
                <div class="warrant_foot">
                    <el-checkbox v-model="checked" style="display:block;margin:auto;text-align:center" @change="change">我已完成上述配置</el-checkbox><br>
                    <div class="warran_button">
                        <router-link to="/accountSeting"><el-button plain >上一步</el-button></router-link>
                        <el-button type="primary" @click="judge" :disabled="disabled">下一步</el-button>
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
import {getdomain} from 'api/userAjax';

export default {
  data() {
    return {
      align: true,
      radio:'1',
      radio1:'1',
      checked: false,
      Id: "",
      domainpath:'',
      disabled:true,
      fileList: [],
    };
  },
  created() {
    this.reload();
    this.Id = localStorage.getItem("ex2");
  },
  methods: {
    getdata(){
      getdomain({accountId:this.Id}).then(res => {
        this.domainpath = res.data.data;     
        this.$message.success("业务域名获取成功，请前往微信公众号后台配置");      
      })
    },
    judge(){
      if (this.fileList != '' && this.domainpath != '') {
        this.$router.push({path:'/SetPayment'})
      }else{
        this.$message.error('您还没有完成上述配置')
        return;
      }
    },
    change(){
        if (this.checked == true) {
          this.disabled = false;
        }else{
          this.disabled = true;
        }
    },
    // 初始化回到顶部
    reload() {
      $("body,html").animate({ scrollTop: 0 }, 200);
    },
    handleAvatarSucces(res,file) {
      this.fileList = file
      if (res.code == "0000") {
        this.$message.success("上传成功");
      } else {
        this.$message.error(res.msg);
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
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
.upload-demo{
  display: inline-block;
}
.warrant{
  min-height: 400px;
  font-size: 14px;
  margin-top: 30px;
  margin-left: 5px;
  padding: 40px;
}
.l_select{
  padding-left: 100px;
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