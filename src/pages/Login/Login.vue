<template>
  <div class="box" v-loading="loading"
   element-loading-text="拼命加载中">
    <div class="content">
      <i class="icon">
        <img src="~img/微信图片_20190704205529.png" alt />
      </i>
      <div class="header">
        <h1>后台账户登录</h1>
        <p>您可以直接输入您的后台账号和密码登录</p>
      </div>
      <br />
      <br />
      <el-input placeholder="请输入内容" v-model="input" clearable style="width:300px;" prefix-icon="el-icon-user"></el-input>
      <br />
      <br />
      <el-input placeholder="请输入密码" v-model="input1" show-password style="width:300px;" prefix-icon="el-icon-lock"></el-input>
      <br />
      <br />
      <br />
      <el-button type="primary" style="width:300px;height:40px;" @click="getdata()">登 录</el-button>
    </div>
  </div>
</template>
<script>
import {login} from 'api/userAjax';
export default {
  data() {
    return {
      input: "",
      input1: "",
      loading:false,
    };
  },
  created() {},
  methods: {
        getdata() {
        this.loading = true;
        login(this.input, this.input1).then(res => {
           this.loading = false;
          localStorage.setItem('ex2',res.data.date.accountid)
          localStorage.setItem('phone',res.data.date.accountTitle)
          // localStorage.setItem('portrait',res.data.date.Codepath)  
          localStorage.setItem('accountType',res.data.date.accountType)
          localStorage.setItem('expiretime',res.data.date.expiretime)
          localStorage.setItem('isExpire',res.data.date.isExpire)
            if (res.data.status == "success") {
                this.$message.success('登录成功')
                  this.$router.push({
                    path: `/Home`
                });
            }else{
                this.$message.error(res.data.date.errMsg)
            }
      })
    },
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
html,
body {
  width: 100%;
  height: 100%;
}
.box {
  width: 100%;
  height: 100%;
  background: url("~img/bg.png") no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;
}
.icon {
  display: inline-block;
}
.header {
  padding: 130px 20px 20px 20px;
}
.header h1 {
  font-size: 40px;
  font-family: PingFangSC-Regular;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
}
.header p {
  font-size: 7px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  padding: 15px 0 15px 0;
}
.content {
  width: 600px;
  height: 500px;
  border-radius: 5px;
  position: absolute;
  left: 20%;
  top: 18%;
}
</style>
