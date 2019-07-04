<template>
  <div class="box">
    <el-main>
      <div>
        <span class="course" @click="switchss">我的课程</span>&nbsp;&nbsp;&nbsp;
        <span class="imgText">新增图文</span>
        <br />
        <br />
        <div class="title">
          <i class="icon"></i>
          <span>基本信息</span>
          <br />
          <br />
          <br />
          <span class="name">课程名称</span>
          <el-input placeholder="请输入名称，最多不超过12个字" v-model="input" clearable maxlength="12"></el-input>
          <span class="number">{{this.input.length}}/12</span>
          <br />
          <br />
          <br />
          <span class="name">课程封面</span>
          <p class="text">240*180像素，支持PNG、JPG、GIF格式，小于5M</p>
          <br />
          <br />
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="imageUrl"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :on-success="handleAvatarSuccess"
            :limit="1"
            accept=".jpg, .png, .gif"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload"
            >保存</el-button>
          </el-upload>

          <br />
          <br />

          <span class="name">课程简介</span>
          <p class="text">为了保证图片完整显示，从第三方编辑器复制的内容需要手动点击“图片本地化”操作</p>
          <br />
          <br />
          <el-input
            type="textarea"
            maxlength="500"
            :rows="7"
            placeholder="请输入内容"
            v-model="textarea"
            class="inp"
          ></el-input>
          <span class="number">{{this.textarea.length}}/500</span>
          <br />
          <br />
          <br />
        </div>
        <div class="title">
          <i class="icon"></i>
          <span>上架信息</span>
          <br />
          <br />
          <br />
          <span class="name">上架时间</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <el-radio v-model="radio" label="1">立即上架</el-radio>
          <el-radio v-model="radio" label="2">暂不上架</el-radio>
          <br />
          <br />
          <br />
          <div style="display:inline-block">
            <span>
              所属分类
              <span class="bt">
                <br />&nbsp;&nbsp;&nbsp;&nbsp;(必填)
              </span>
            </span>
          </div>
          <el-button style="margin-left:22px;" @click="Popup">选择分类</el-button>
          <span
            style="font-size:16px;font-weight:400;color:rgba(153,153,153,1);margin-left:25px;"
          >选择后，可添加到相应分类</span>
          <br />
          <br />
          <br />
          <span>获取形式</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-radio v-model="radios" label="1" @change="radioq">收费</el-radio>

          <br />
          <br />
          <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
          <el-radio v-model="radios" label="2" @change="radioq">免费</el-radio>
          <el-radio v-model="radio1" label="0" @change="judge">所有人免费</el-radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-radio v-model="radio1" label="1" @change="judge">会员免费</el-radio>
          <br />
          <br />
          <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span class="money">￥</span>
          <el-input placeholder="0.01-50000" v-model="input3" :disabled="disabled"></el-input>
          <br />
          <br />
          <br />

          <div style="display:inline-block" class="hxj">
            <span>
              划线价
              <span class="bt">
                <br />&nbsp;&nbsp;(必填)
              </span>
            </span>
          </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span class="money">￥</span>
          <el-input placeholder="0.01-50000" v-model.number="input4" :disabled="disabled"></el-input>
          <br />
          <br />
          <el-button type="submit" @click="adddata()">保存</el-button>
        </div>
      </div>
    </el-main>
    <!-- 弹窗 -->
    <el-dialog title="选择分类" :visible.sync="delVisible" width="600px" center style="z-index: 999">
      <div class="del-dialog-cnt">
        <div class="gray">注意：包含以下级分类的项目不可选择</div>
        <br />
        <div class="Choice">
          <ul>
            <li v-for="(item,index) in Choice" :key="index" @click="abv(item.kindName)">
              <el-radio v-model="radio2" :label="item.kindId">{{item.kindName}}</el-radio>
              <br />
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="delVisible = false">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
    <script>
import sidebar from "@/components/sidebar/sidebar.vue";
import Header from "@/components/Header/Header.vue";
import { classe } from "api/userAjax";
import { addlesson } from "api/userAjax";
import { uploadImg } from "api/userAjax";
export default {
  data() {
    return {
      input: "", // 课程名称
      input1: "", // 章节标题1
      input2: "", // 章节标题2
      input3: "", // 收费价格
      input4: "", // 划线价
      fileList: [],
      imageUrl: "http://192.168.0.107:8081/lesson/insertLessonImg", // 上传地址
      textarea: "", // 课程简介
      radio: "1", // 上架时间
      radios: "2", // 获取形式
      radio1: "0", // 免费
      radio2: "", // 选择分类
      disabled: true, // 是否禁用
      aaa: "", // 类型名字
      lessonType: 1,
      imgurl: "", //后台返回的路径
      delVisible: false,

      radio: "1",
      Choice: []
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    //类型名字获取
    abv(val) {
      this.aaa = val;
      console.log(val);
    },

    //刷新页面
    switchss() {
      this.$router.go(0);
    },
    //判断如果选择收费，输入框可以输入
    radioq(val) {
      if (val == "1") {
        this.disabled = false;
        this.radio1 = "";
        // this.radio1.disabled = true
      } else {
        this.disabled = true;
        this.radio1 = "0";
        this.input3 = "";
        this.input4 = "";
      }
    },

    //判断会员免费输入框可以输入
    judge() {
      if (this.radio1 == "1") {
        this.disabled = false;
        this.radios = "2";
      } else {
        this.disabled = true;
        this.input3 = "";
        this.input4 = "";
        // this.radios = "1"
      }
      if (this.radio1 != "") {
        this.radios = "2";
      }
    },
    getdata() {
      classe("1").then(res => {
        this.Choice = res.data;
        // console.log(this.Choice)
      });
    },
    adddata() {
      // this.$refs.upload.submit();
      addlesson(
        this.input,
        this.lessonType,
        this.aaa,
        "1",
        this.radio,
        this.textarea,
        this.input4,
        this.input3,
        this.radio1,
        this.imgurl
      ).then(res => {
        // this.Choice = res.data
        console.log(res);
      });
      console.log(this.input);
      console.log(this.aaa);
      console.log(this.textarea);
      console.log(this.input4);
      console.log(this.input3);
    },

    submitUpload() {
      this.$refs.upload.submit();
    },
    handleAvatarSuccess(response) {
      console.log(response);
      this.imgurl = response;
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
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
  width: 1650px;
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
</style>