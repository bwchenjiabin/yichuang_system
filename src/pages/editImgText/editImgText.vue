
<template>
        <div class="box">
               <el-container>
                <el-header>
                    <Header></Header>
                </el-header>
                <el-container>
                    <el-aside width="200px">
                        <sidebar></sidebar>
                    </el-aside>
                        <el-main>
                          <div>
                          <router-link to="/content"><span class="course" >我的课程</span>&nbsp;&nbsp;&nbsp;</router-link>/&nbsp;&nbsp;&nbsp;<span class="imgText">编辑图文</span><br><br>
                            <div class="title">
                                <i class="icon"></i>
                                <span>基本信息</span><br><br><br>
                                <span class="name">课程名称</span>
                                <el-input placeholder="请输入名称，最多不超过12个字" v-model="input" clearable maxlength="12"> 
                                </el-input>
                                <span class="number">{{this.input.length}}/12</span><br><br><br>
                                <span class="name">课程封面</span>
                                <p class="text">240*180像素，支持PNG、JPG、GIF格式，小于5M</p><br><br>
                                <div class="img-box">
                                  <img :src="'http://yckt.yichuangketang.com'+this.imgurl" alt />
                                </div><br>
                                    <el-upload
                                      class="upload-demo"
                                      ref="upload"
                                      action="http://yckt.yichuangketang.com:8081/lesson/insertLessonImg"
                                      :on-preview="handlePreview"
                                      :on-remove="handleRemove"
                                      :file-list="fileList"
                                      :on-success="handleAvatarSuccess"
                                      :limit="1"
                                      accept=".jpg,.png,.gif"
                                      :auto-upload="false">
                                      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">保存</el-button>
                                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                    </el-upload>                            
                                <br><br>


                               <span class="name">课程简介</span>
                                <p class="text">为了保证图片完整显示，从第三方编辑器复制的内容需要手动点击“图片本地化”操作</p><br><br>
                                <el-input
                                  type="textarea"
                                  maxlength="500"
                                  :rows="7"
                                  placeholder="请输入内容"
                                  v-model="textarea" class="inp">
                                </el-input><span class="number">{{this.textarea.length}}/500</span><br><br><br>
                            </div> 


                                     <div class="title">
          <i class="icon"></i>
          <span>上架信息</span>
          <br>
          <br>
          <br>
          <span class="name">上架时间</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <el-radio v-model="radio" label="1">立即上架</el-radio>
          <el-radio v-model="radio" label="2">暂不上架</el-radio>
          <br>
          <br>
          <br>


          <span>获取形式</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-radio v-model="radios" label="2" @change="radioq">收费</el-radio><el-radio v-model="radios" label="0" @change="radioq">所有人免费</el-radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-radio v-model="radios" label="1" @change="radioq">会员免费</el-radio>
          <br>
          <br>
          <br>

           &nbsp;&nbsp;现价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="money">￥</span>
          <el-input placeholder="0.01-50000" v-model="input3" :disabled="disabled"></el-input><br><br><br>

          <div style="display:inline-block" class="hxj">
            <span>
              原价
              <!-- <span class="bt">
                <br>&nbsp;&nbsp;(必填)
              </span> -->
            </span>
          </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span class="money">￥</span>
          <el-input placeholder="0.01-50000" v-model.number="input4" :disabled="disabled"></el-input><br><br>
          <el-button type="submit" @click="updateLessons()">保存</el-button>
        </div>
      </div>
        </el-main>
                </el-container>
            </el-container>
        </div>    
    </template>
    <script>
import sidebar from '@/components/sidebar/sidebar.vue'
import Header from '@/components/Header/Header.vue'
import {classe} from 'api/userAjax';
import {ceshi} from 'api/userAjax';
import {updateLesson} from 'api/userAjax';
export default {
  data() {
    return {
      input: "", // 课程名称
      input3: "", // 收费价格
      input4: "", // 划线价
      fileList: [],
      // imageUrl: "", // 上传地址
      imgurl:'',   //后台返回的路径
      imgurls:'',
      textarea: "", // 课程简介
      radio: "", // 上架时间
      radios: "", // 获取形式
      // radio1: "1", // 免费
      radio2: "", // 选择分类
      disabled: true, // 是否禁用
      aaa:'', // 类型名字
      lessonType:1,
      date:[],

      delVisible: false,

      radio: "1",
      Choice: [],
      Id:'',
    };
  },
  created() {
    this.getParams();
    this.getdata();
    this.getdataedit();
  },
  methods: {
    //类型名字获取
    abv(val){
        this.aaa = val
        console.log(val)
    },
    //修改展示
    getdataedit() {
        ceshi(this.Id).then(res => {
          this.date = res.data
          this.input = res.data.lessonName
          this.textarea = res.data.lessonDetail
          this.radio = res.data.status + ""
          this.radios = res.data.lessonVip + ""
          this.input4 = res.data.lessonPriceFormer
          this.input3 = res.data.lessonPriceNow
          this.imgurl = res.data.img
          console.log(res);
        if (this.radios == "0") {
         this.disabled = true;
        this.input3 = "";
        this.input4 = "";
      }else {
        this.disabled = false;
      }
      })
    },
        //修改
    updateLessons() {
        updateLesson(this.Id,this.input,this.imgurl,this.textarea,this.radio,this.radios,this.input4,this.input3,localStorage.getItem('ex2')).then(res => {
        this.$message.success(res.data)
        this.$router.push({
        path: `/content`
      });
      }).catch(err => {
      this.$message.error(err)
      })
    },
    
    //获取传值    
    getParams(){
        var routerParams = this.$route.params.id
        this.Id = routerParams
    },
    //判断如果选择收费，输入框可以输入
    radioq(val) {
      let that = this;
      if (val == "0") {
        this.disabled = true;
        this.input3 = "";
        this.input4 = "";
      } else {
        this.disabled = false;
      }
    },
    //分类展示
        getdata () {
      classe(localStorage.getItem('ex2')).then(res => {
        this.Choice = res.data
      })
    },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleAvatarSuccess(response){
        console.log(response);
        this.imgurl=response
      },
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
        console.log(file);
      },

    //弹窗
    Popup() {
      this.delVisible = true;
    },
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
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
.title {
  padding: 20px;
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
.title {
  width: auto;
  display: block;
}
.title span {
  margin-left: 10px;
}
.name {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-right: 15px;
}
.number {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.text {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  display: inline;
}
.course {
  font-size: 18px;
  font-family: PingFangSC-Medium;
  font-weight: 700;
  color: rgba(51, 51, 51, 1);
  cursor: pointer;
}
.imgText {
  font-size: 18px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 132px;
  text-align: center;
  background: rgba(251, 251, 251, 1);
  border: 1px dashed #d9d9d9;
  width: 176px;
  height: 132px;
  margin-left: 70px;
}
.avatar-uploader-icon:hover {
  border-color: #409eff;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.update {
  font-size: 28px;
  color: #8c939d;
  width: 275px !important;
  height: 178px;
  line-height: 132px;
  text-align: center;
  background: rgba(251, 251, 251, 1);
  border: 1px dashed #d9d9d9;
  width: 176px;
  height: 132px;
}
.update:hover {
  border-color: #409eff !important;
}
.inp {
  margin-left: 70px;
  width: 706px;
  height: 170px;
}
.content {
  padding: 20px;
}
.cont-tit {
  width: 600px;
  height: 70px;
  background: rgba(251, 251, 251, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  line-height: 70px;
  padding-left: 30px;
  display: inline-block;
}
.chapter {
  padding-right: 50px;
}
.inp2 {
  margin-left: 50px;
}
.btn {
  margin-left: 40px;
}
.btn1 {
  width: 120px;
  height: 50px;
  margin-left: 20px;
}
.table ul li {
  width: 650px;
  height: 60px;
  background: rgba(251, 251, 251, 0);
  line-height: 60px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  padding-left: 150px;
}
.table ul li:hover {
  background: rgba(251, 251, 251, 1);
}
.icons {
  float: right;
}
.icons i {
  width: 23px;
  height: 23px;
  cursor: pointer;
}
.cont-title {
  width: 750px;
  height: 70px;
  background: rgba(251, 251, 251, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  line-height: 70px;
  padding-left: 30px;
  display: inline-block;
}
.icona {
  cursor: pointer;
  width: 23px;
  height: 23px;
  margin-left: 150px;
}
.bt {
  color: #999999;
}
.money {
  width: 40px;
  height: 40px;
  background: rgba(238, 238, 238, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  text-align: center;
  line-height: 40px;
  display: inline-block;
}

.gray {
  height: 50px;
  background: rgba(251, 251, 251, 1);
  line-height: 50px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  padding-left: 30px;
}
.Choice ul li {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  height: 15px;
  padding: 20px;
}
/deep/ .el-dialog__header {
  text-align: left;
}
/deep/ .el-dialog__title {
  font-size: 16px;
}
.img-box {
    width: 150px;
    height: 150px;
}
.img-box img {
  width: 100%;
  height: 100%;
}
</style>