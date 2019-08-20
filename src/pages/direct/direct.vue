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
            <div>
              <span class="course" @click="switchss">我的直播</span>&nbsp;&nbsp;&nbsp;/
              <span class="imgText">{{title}}</span>
              <br />
              <div class="title">
                <i class="icon"></i>
                <span>基本信息</span>
                <br />
                <br />
                <br />
                <span class="name">直播名称</span>
                <el-input placeholder="请输入名称，最多不超过12个字" v-model="input" clearable maxlength="30"></el-input>
                <span class="number">{{this.input.length}}/30</span>
                <br />
                <br />
                <br />
                <span class="name">直播封面</span>
                <p class="text">240*180像素，支持PNG、JPG、GIF格式，小于5M</p>
                <br />
                <br />
                <el-upload
                  class="avatar-uploader"
                  action="http://yckt.yichuangketang.com:8081/section/insertImg"
                  :data="{accountId: this.Id}"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  accept=".jpg, .png, .gif, .svg, .jpeg, .tif, .raw"
                >
                  <img
                    v-if="imageUrl"
                    :src="'http://yckt.yichuangketang.com:8081'+this.imageUrl"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <br />
                <br />
                <span class="name">直播简介</span>
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
                <span class="search">直播时间:</span>
                <el-date-picker
                  v-model="value2"
                  type="datetime"
                  range-separator="至"
                  placeholder="开始日期"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  align="right"
                  :picker-options="pickerOptions"
                ></el-date-picker>至
                <el-date-picker
                  v-model="value3"
                  type="datetime"
                  range-separator="至"
                  placeholder="结束日期"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  align="right"
                  :picker-options="pickerOptions"
                ></el-date-picker>
                <br />
                <br />
                <div class="updatas" v-if="type==1">
                  <span class="search">PPT上传:</span>
                  <br />
                  <br />
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <el-button size="small" type="primary">点击预览</el-button>
                  </el-upload>
                </div>
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
                <span>获取形式</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-radio v-model="radios" label="2" @change="radioq">收费</el-radio>
                <el-radio v-model="radios" label="0" @change="radioq">所有人免费</el-radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-radio v-model="radios" label="1" @change="radioq">会员免费</el-radio>
                <br />
                <br />
                <br />
                <div style="display:inline-block" class="hxj">
                  <span>
                    现价
                    <span class="bt">
                      <br />(必填)
                    </span>
                  </span>
                </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span
                  class="money"
                >￥</span>
                <el-input
                  placeholder="0.01-50000"
                  v-model="input3"
                  :disabled="disabled"
                  onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
                ></el-input>
                <br />
                <br />
                <br />
                <div style="display:inline-block" class="hxj">
                  <span style="line-height:42px; display: block;height: 100%;">
                    原价
                    <span class="bt"></span>
                  </span>
                </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span
                  class="money"
                >￥</span>
                <el-input
                  placeholder="0.01-50000"
                  v-model="input4"
                  :disabled="disabled"
                  onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
                ></el-input>
                <br />
                <br />
                <el-button type="submit" @click="adddata()">保存</el-button>
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
import { classe } from "api/userAjax";
import { addlive } from "api/userAjax";
import { uploadImg } from "api/userAjax";
import { user } from "api/userAjax";
import { ssuser } from "api/userAjax";
export default {
  data() {
    return {
      input: "", // 课程名称
      input1: "", // 章节标题1
      input2: "", // 章节标题2
      input3: "", // 收费价格
      input4: "", // 划线价
      fileList: [],
      imageUrl: "", // 上传地址
      textarea: "", // 课程简介
      radio: "1", // 上架时间
      radios: "0", // 获取形式
      radio2: "", // 选择分类
      disabled: true, // 是否禁用
      aaa: "", // 类型名字
      lessonType: 1,
      imgurl: "", //后台返回的路径
      delVisible: false,
      radio: "1",
      Choice: [],
      checkBoxData: [], //多选框选择的值
      checkBoxDataid: [],
      checkBoxDataids: [],
      checkBoxDatas: [], //多选框选择的值
      Id: "",
      list: "",
      value2: "",
      value3: "",
      type: "",
      title: "",
      currentPage: 1,
      usersize: 0,
      loading: true,
      pagesize: 5,
      opentype: "",
      inputsearch: "",
      fileList: [],
      tableData: [
        {
          img: "../../../static/img/矢量智能对象@2x_看图王.png",
          name: "王小虎",
          address: "讲师"
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  created() {
    this.getParams();
    // this.getdata();
    this.Id = localStorage.getItem("ex2");
  },
  methods: {
    //获取传值
    getParams() {
      var routerParams = this.$route.query.type;
      this.type = routerParams;
      if (this.type == "0") {
        this.title = "新增语音直播";
        this.opentype = "1";
      } else if (this.type == "1") {
        this.title = "新增PPT直播";
        this.opentype = "2";
      }
    },
    //刷新页面
    switchss() {
      this.$router.push({
        path: `/directlist`
      });
    },

    //判断如果选择收费，输入框可以输入
    radioq(val) {
      let that = this;
      if (val == "0") {
        that.disabled = true;
        that.input3 = "";
        that.input4 = "";
      } else {
        that.disabled = false;
      }
    },
    adddata() {
      this.checkBoxDataids = this.checkBoxDatas.map(item => item.businessId);
      if (this.disabled == false) {
        if (this.input3 == 0 || this.input4 == 0) {
          this.$message.error("价钱不可以小于0元");
          return;
        } else {
          addlive({
            title: this.input,
            image: this.imageUrl,
            opentime: this.value2,
            closetime: this.value3,
            opentype: this.opentype,
            accountid: this.Id,
            livevip: this.radios,
            price: this.input4,
            nowprice: this.input3,
            info: this.textarea,
            teacherid: this.checkBoxDataids
          }).then(res => {
            if (res.data.code == "0000") {
              this.switchss();
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
              return;
            }
          });
        }
      } else {
        addlive({
          title: this.input,
          image: this.imageUrl,
          opentime: this.value2,
          closetime: this.value3,
          opentype: this.opentype,
          accountid: this.Id,
          livevip: this.radios,
          price: this.input4,
          nowprice: this.input3,
          info: this.textarea,
          teacherid: this.checkBoxDataids
        }).then(res => {
          if (res.data.code == "0000") {
            this.switchss();
            this.$message.success(res.data.msg);
          } else {
            this.$message.error(res.data.msg);
            return;
          }
        });
      }
    },
    handleAvatarSuccess(res) {
      this.imageUrl = res.data;
      if (res.code == "0000") {
        this.$message.success(res.msg);
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
    }
  },
  components: {
    sidebar,
    Header
  }
};
</script>
    <style scoped>
.buttons {
  display: flex;
  align-items: center;
}
.hxj {
  position: absolute;
  height: 42px;
}
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
.updatas {
  width: 25%;
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
  width: 50px;
  height: 50px;
}
.img-box img {
  width: 100%;
  height: 100%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  margin-left: 70px;
  display: block;
}
.list {
  width: 50%;
  height: auto;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}

</style>