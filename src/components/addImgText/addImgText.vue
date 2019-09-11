<template>
  <div class="box">
    <el-main>
      <div>
        <span class="course" @click="switchss">我的课程</span>&nbsp;&nbsp;&nbsp;/
        <span class="imgText">新增图文</span>
        <br />
        <div class="title">
          <i class="icon"></i>
          <span>基本信息</span>
          <br />
          <br />
          <br />
          <span class="name">课程名称</span>
          <el-input placeholder="请输入名称，最多不超过60个字" v-model="input" clearable maxlength="60"></el-input>
          <span class="number">{{this.input.length}}/60</span>
          <br />
          <br />
          <br />
          <span class="name">课程封面</span>
          <p class="text">240*180像素，支持PNG、JPG、GIF格式，小于5M</p>
          <br />
          <br />
          <el-upload
                  class="avatar-uploader"
                  action="http://yckt.yichuangketang.com:8081/section/insertImg"
                  :show-file-list="false"
                  :auto-upload="false"
                  :on-change='changeUpload'
                  accept=".jpg, .png, .gif, .svg, .jpeg, .tif, .raw">
                  <img
                    v-if="imageUrl"
                    :src="'http://yckt.yichuangketang.com:8081'+this.imageUrl"
                    class="avatar"/>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          <br />
          <br />
          <span class="name">课程简介</span>
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
          <el-button style="margin-left:22px;" @click="Popup" class="sort">选择分类</el-button>
          <span
            style="font-size:16px;font-weight:400;color:rgba(153,153,153,1);margin-left:25px;"
          >选择后，可添加到相应分类</span>
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
    <!-- 弹窗 -->
    <el-dialog
      title="选择分类"
      :visible.sync="delVisible"
      width="600px"
      center
      style="z-index: 999"
      :close-on-click-modal="false">
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
        <el-button type="primary" @click="delVisible = false,assignment()">保 存</el-button>
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
  <!-- </el-scrollbar> -->
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
      Id: "",
      dialogVisible: false,
      // 裁剪组件的基础配置option
       option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'png', // 裁剪生成图片的格式
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
        infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      picsList: [],  //页面显示的数组
      // 防止重复提交
      loading: false
    };
  },
  created() {
    this.getdata();
    this.Id = localStorage.getItem("ex2");
  },
  methods: {
        changeUpload(file, fileList) {
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('上传文件大小不能超过 5MB!')
        return false
      }
      this.imgurl = URL.createObjectURL(file.raw)
      this.option.img = this.imgurl
      this.dialogVisible = true
    },
    // 点击裁剪，这一步是可以拿到处理后的地址
    finish() {
      this.$refs.cropper.getCropBlob((data) => {
        let formData = new FormData();
        formData.append('file',data);
        formData.append('accountId',this.Id);
        uploadImg(formData).then(res => {
            res = JSON.parse(res)
            this.dialogVisible = false
            this.imageUrl = res.data;
            if (res.code == "0000") {
              this.$message.success('上传成功');
            } else {
              this.$message.error(res.msg);
            }
        })
      })
    },
    //类型名字获取
    abv(val) {
      this.aaa = val;
    },
    assignment() {
      $(".sort").html(this.aaa);
    },
    //刷新页面
    switchss() {
      this.$router.go(0);
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
    getdata() {
      classe(localStorage.getItem("ex2")).then(res => {
        this.Choice = res.data;
      });
    },
    adddata() {
      if (this.aaa == "") {
        this.$message.error("分类不可为空");
        return;
      }
      if (this.disabled == false) {
        if (this.input3 == 0 || this.input4 == 0) {
          this.$message.error("价钱不可以小于0元");
          return;
        } else {
          addlesson(
            this.input,
            this.lessonType,
            this.aaa,
            localStorage.getItem("ex2"),
            this.radio,
            this.textarea,
            this.input4,
            this.input3,
            this.radios,
            this.imageUrl
          )
            .then(res => {
              this.switchss();
              this.$message.success(res.data);
            })
            .catch(err => {
              this.$message.error(err);
            });
        }
      } else {
        addlesson(
          this.input,
          this.lessonType,
          this.aaa,
          localStorage.getItem("ex2"),
          this.radio,
          this.textarea,
          this.input4,
          this.input3,
          this.radios,
          this.imageUrl
        )
          .then(res => {
            this.switchss();
            this.$message.success(res.data);
          })
          .catch(err => {
            this.$message.error(err);
          });
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleAvatarSuccess(res) {
      this.imageUrl = res.data;
      if (res.code == "0000") {
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    },
    //弹窗
    Popup() {
      this.delVisible = true;
    }
  },
  components: {
    sidebar,
    Header
  }
};
</script>
    <style scoped>
.hxj {
  position: absolute;
  height: 42px;
}
.box {
  background: #f5f5f5;
  width: 100%;
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
  margin-left: 70px;
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
  display: block;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.cropper {
  width: auto;
  height: 300px;
}
</style>