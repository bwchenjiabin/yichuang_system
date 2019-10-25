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
                  :show-file-list="false"
                  :auto-upload="false"
                  :on-change="changeUpload"
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
                  :picker-options="pickerOptions0"
                ></el-date-picker>
                <span class="Tips">嘉宾（原讲师）可以在 直播间-操作 主动结束直播</span>
                <br />
                <br />
                <div class="updatas" v-if="type==1">
                  <span class="search">PPT上传:</span>
                  <br />
                  <br />
                  <el-upload
                    class="upload-demo"
                    action="http://yckt.yichuangketang.com:8081/file/uploadppt"
                    :data="{accountId: this.Id}"
                    :before-remove="beforeRemove"
                    :on-success="handleAvatarSucces"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                    accept=".ppt, .pptx"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                  <br />
                  <el-button size="small" type="primary" plain @click="serchppts">点击预览</el-button>
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
                <div class="shuru">
                  <div style="display:inline-block" class="hxj">
                  <span>
                    现价
                    <span class="bt">
                      <br />(必填)
                    </span>
                  </span>
                </div>
                <span
                  class="money"
                >￥</span>
                <el-input
                  placeholder="0.01-50000"
                  v-model="input3"
                  :disabled="disabled"
                  onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
                ></el-input>
                </div>
                <br />
                <br />
                <br />
                <div class="shuru">
                  <div style="display:inline-block" class="hxj">
                  <span style="line-height:42px; display: block;height: 100%;">
                    原价
                    <span class="bt"></span>
                  </span>
                </div>
                <span
                  class="money"
                >￥</span>
                <el-input
                  placeholder="0.01-50000"
                  v-model="input4"
                  :disabled="disabled"
                  onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
                ></el-input>
                </div>
                
                <br />
                <br />
                <el-button type="submit" @click="adddata()">保存</el-button>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
      <!-- 弹窗 -->
      <el-dialog
        title="PPT预览"
        :visible.sync="delVisible"
        width="700px"
        center
        style="z-index: 999;text-align: left"
        :close-on-click-modal="false"
      >
        <el-scrollbar style="height:100%">
          <div class="del-dialog-cnt" style="height:500px;overflow:auto;">
            <span v-text="Tips" v-show="Tipss" class="tipse"></span>
            <div class="img-box" v-for="(item,index) in PPTlist" :key="index">
              <img :src="'http://yckt.yichuangketang.com:8081'+item.imgpath" alt />
            </div>
          </div>
        </el-scrollbar>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="Close">关 闭</el-button>
        </span>
      </el-dialog>

      <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
        <div class="cropper-content">
          <div class="cropper" style="text-align:center">
            <vueCropper
              ref="cropper"
              :img="option.img"
              :outputSize="option.size"
              :outputType="option.outputType"
              :info="true"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :original="option.original"
              :autoCrop="option.autoCrop"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :fixed="option.fixed"
              :fixedNumber="option.fixedNumber"
              :centerBox="option.centerBox"
              :infoTrue="option.infoTrue"
              :fixedBox="option.fixedBox"
            ></vueCropper>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="finish" :loading="loading">确认</el-button>
        </div>
      </el-dialog>
    </div>
  </el-scrollbar>
</template>
    <script>
import sidebar from "@/components/sidebar/sidebar.vue";
import Header from "@/components/Header/Header.vue";
import { classe } from "api/userAjax";
import { addlive } from "api/userAjax";
import { user } from "api/userAjax";
import { ssuser } from "api/userAjax";
import { serchppt } from "api/userAjax";
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
      imageUrl: "",
      PPTUrl: "",
      myCroppa: {},
      pptpath: "",
      PPTlist: [],
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
      Tips: "",
      Tipss: false,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e6就是不可以选择今天的
        }
      },
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
      },
      dialogVisible: false,
      // 裁剪组件的基础配置option
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "png", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 240, // 默认生成截图框宽度
        autoCropHeight: 180, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: false, // 是否开启截图框宽高固定比例
        fixedNumber: [5, 5], // 截图框的宽高比例
        full: false, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: false // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      picsList: [], //页面显示的数组
      // 防止重复提交
      loading: false
    };
  },
  created() {
    this.getParams();
    this.Id = localStorage.getItem("ex2");
  },
  methods: {
    changeUpload(file, fileList) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error("上传文件大小不能超过 5MB!");
        return false;
      }
      this.imgurl = URL.createObjectURL(file.raw);
      this.option.img = this.imgurl;
      this.dialogVisible = true;
    },
    // 点击裁剪，这一步是可以拿到处理后的地址
    finish() {
      this.$refs.cropper.getCropBlob(data => {
        let formData = new FormData();
        formData.append("file", data);
        formData.append("accountId", this.Id);
        uploadImg(formData).then(res => {
          res = JSON.parse(res);
          this.dialogVisible = false;
          this.imageUrl = res.data;
          if (res.code == "0000") {
            this.$message.success("上传成功");
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
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
            opentype: this.opentype,
            accountid: this.Id,
            livevip: this.radios,
            price: this.input4,
            nowprice: this.input3,
            info: this.textarea,
            teacherid: this.checkBoxDataids,
            filepath: this.PPTUrl
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
          opentype: this.opentype,
          accountid: this.Id,
          livevip: this.radios,
          price: this.input4,
          nowprice: this.input3,
          info: this.textarea,
          teacherid: this.checkBoxDataids,
          filepath: this.PPTUrl
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
    handleAvatarSucces(res) {
      console.log(this.fileList)
      this.PPTUrl = res.data;
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
    serchppts() {
      serchppt({ pptpath: this.PPTUrl }).then(res => {
        if (res.data.data == "") {
          this.Tips = "暂无PPT";
          this.Tipss = true;
        } else {
          this.Tips = "";
          this.Tipss = false;
        }
        this.delVisible = true;
        this.PPTlist = res.data.data;
      });
    },
    Close() {
      this.delVisible = false;
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
  height: 42px;
}
.shuru{
  height:50px;
  width: 50%;
  display: flex;
  align-items: center;
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
.tipse {
  width: 100%;
  display: block;
  text-align: center;
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
  width: 630px;
}
.img-box img {
  border: 1px solid #ccc;
  width: 100%;
  height: 100%;
}
.Tips {
  color: rgba(153, 153, 153, 1);
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
  overflow-y: hidden;
}
.cropper {
  width: auto;
  height: 300px;
}
</style>