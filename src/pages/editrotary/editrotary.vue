<template>
    <el-scrollbar style="height:100%">
        <div class="box">
    <el-container>
      <el-header style="    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 20px -10px #000;">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <sidebar></sidebar>
        </el-aside>

        <el-main>
          <div>
            <router-link to="/rotary">
              <span class="course">轮播图</span>&nbsp;&nbsp;&nbsp;
            </router-link>/&nbsp;&nbsp;&nbsp;
            <span class="imgText">编辑轮播图</span>
            <br />
            <br />
            <div class="title">
              <i class="icon"></i>
              <span>基本信息</span>
              <br />
              <br />
              <br />
              <span class="name">轮播图名称</span>
              <el-input placeholder="请输入名称，最多不超过12个字" v-model="input" clearable maxlength="12"></el-input>
              <span class="number">{{this.input.length}}/12</span>
              <br />
              <br />
              <br />
              <span class="name">上传图片</span>
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
          <img v-if="imageUrl" :src="'http://yckt.yichuangketang.com:8081'+this.imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
          <br><br>
          <span class="name">是否显示：</span>
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ccc"
            @change="changes">
          </el-switch>
              <br />
              <br />
              <span class="name">跳转设置</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <el-radio v-model="radios" label="1" @change="radioq">跳转到</el-radio>
              <el-button plain @click="Popup" :disabled="disabled">重新选择</el-button>
              <br />
              <br />
              <br />
              <el-radio v-model="radios" label="2" class="radio" @change="radioq">无跳转</el-radio>
              <br />
              <br />
              <br />
              <el-button type="primary" @click="updatar()">保存</el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 弹窗 -->
    <el-dialog title :visible.sync="delVisible" width="550px" center style="z-index: 999" :close-on-click-modal="false">
      <div class="del-dialog-cnt">
        <div class="tab">
          <el-tabs v-model="activeName">
            <el-tab-pane label="课程" name="courser">
              <el-tabs
                :tab-position="tabPosition"
                style="height:300px;overflow:auto;position:relative"
                v-model="courser"
              >
                <el-tab-pane label="图文" name="imgText">
                  <el-table
                    @current-change="handleCurrentChange"
                    ref="singleTable"
                    :data="tableData"
                    highlight-current-row
                    style="width: 100%"
                  >
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column property="lessonName" label="名称" width="120"></el-table-column>
                    <el-table-column property="upperoffTime" label="创建时间" width="120"></el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="音频" name="audio">
                  <el-table
                    @current-change="handleCurrentChange"
                    ref="singleTable"
                    :data="tableData1"
                    highlight-current-row
                    style="width: 100%"
                  >
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column property="lessonName" label="名称" width="120"></el-table-column>
                    <el-table-column property="upperoffTime" label="创建时间" width="120"></el-table-column>
                  </el-table>
                </el-tab-pane>

                <el-tab-pane label="视频" name="video">
                  <el-table
                    @current-change="handleCurrentChange"
                    ref="singleTable"
                    :data="tableData2"
                    highlight-current-row
                    style="width: 100%"
                  >
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column property="lessonName" label="名称" width="120"></el-table-column>
                    <el-table-column property="upperoffTime" label="创建时间" width="120"></el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
            <br />
            <br />

            <!-- 图文分页 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="current_change"
              @current-page="currentPage"
              :page-size="pagesize"
              background
              layout="total, prev, pager, next"
              :total="this.twsize"
              v-if="this.courser == 'imgText'"
            ></el-pagination>

            <!-- 音频分页 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="current_change1"
              :current-page="currentPage1"
              :page-size="pagesize"
              background
              layout="total, prev, pager, next"
              :total="this.ypsize"
              v-if="this.courser == 'audio'"
            ></el-pagination>

            <!-- 视频分页 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="current_change2"
              :current-page="currentPage2"
              :page-size="pagesize"
              background
              layout="total, prev, pager, next"
              :total="this.spsize"
              v-if="this.courser == 'video'"
            ></el-pagination>
          </el-tabs>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="delVisible = false">保 存</el-button>
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
import { updatarotary } from "api/userAjax";
import { ImgText } from "api/userAjax";
import { audio } from "api/userAjax";
import { video } from "api/userAjax";
import { updataId } from "api/userAjax";
import {addrotary} from 'api/userAjax';
import { uploadImg } from "api/userAjax";

export default {
  data() {
    return {
      input: "",
      fileList: [],
      imageUrl: "", // 上传返回路径
      radios: "1",
      delVisible: false,
      activeName: "courser", //默认选择
      radio2: "1", // 选择分类
      tabPosition: "left", // 方向
      courser: "imgText", //默认选择
      currentRow: null,
      disab: true, //按钮禁用
      disabled: false, //按钮禁用
      headerMsg: { "Content-Type": "multipart/form-data" },
      imgurl:'',
      Choice: [
        {
          class: "餐饮行业",
          id: "1"
        },
        {
          class: "运营工作",
          id: "2"
        }
      ],
      tableData: [],
      tableData1: [],
      tableData2: [],
      currentPage: 1, //图文当前页
      currentPage1: 1, //音频当前页
      currentPage2: 1, //视频当前页
      value: true, // 
      valnum:1,
      pagesize: 5,
      twsize: "",
      ypsize: "",
      spsize: "",
      Id: "",
      number: "",
      userid:'',
       dialogVisible: false,
      // 裁剪组件的基础配置option
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "png", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 500, // 默认生成截图框宽度
        autoCropHeight: 500, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: false, // 是否开启截图框宽高固定比例
        fixedNumber: [5, 5], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        // enlarge:1,
      },
      picsList: [], //页面显示的数组
      // 防止重复提交
      loading: false
    };
  },
  created() {
    this.getParams();
    this.getImgText();
    this.getaudio();
    this.getvideo();
    this.getdata();
    this.keep();
    this.userid = localStorage.getItem("ex2");
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
        formData.append("accountId", this.userid);
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
    getdata() {
      updataId(this.Id).then(res => {
        this.input = res.data.name;
        this.imageUrl = res.data.img;
        this.number = res.data.type;
        this.currentRow = res.data.lessonid;
        console.log(res);
      });
    },
    changes(val){
      if (val == true) {
        this.valnum = 1
      }else{
        this.valnum = 2
      }
      console.log(this.valnum)
    },

        //单条删除
    deleteRow() {
      this.delVisible = false;      
        delrotary(this.userid).then(res => {
          this.$message.success('删除成功')
            this.getdata();
      })
    },

      submitUpload() {
        this.$refs.upload.submit();
      },
    //获取传值
    getParams() {
      var routerParams = this.$route.params.id;
      this.Id = routerParams;
    },
    // 图文查询
    getImgText() {
      ImgText(localStorage.getItem("ex2"), "1", this.currentPage).then(res => {
        this.tableData = res.data.data.data;
        this.twsize = res.data.data.total
      });
    },
    // 音频查询
    getaudio() {
      audio(localStorage.getItem("ex2"), "2", this.currentPage1).then(res => {
         this.tableData1 = res.data.data.data;
            this.ypsize = res.data.data.total
      });
    },
    // 视频查询
    getvideo() {
      video(localStorage.getItem("ex2"), "3", this.currentPage2).then(res => {
        this.tableData2 = res.data.data.data;
            this.spsize = res.data.data.total
      });
    },
    // 刷新页面
    switchss() {
      this.$router.go(0);
    },
    //编辑轮播
    updatar() {
      addrotary({name:this.input,owner:localStorage.getItem("ex2"),lessonid:this.currentRow,img:this.imageUrl,id:this.Id,extendtwo:this.valnum}).then(res => {
        this.$message.success(res.data.msg);
        this.$router.push({
          path: `/rotary`
        });
      });
    },
    
    keep() {
      if (this.courser == "imgText") {
        this.number = 1;
      }
      if (this.courser == "audio") {
        this.number = 2;
      }
      if (this.courser == "video") {
        this.number = 3;
      }
    },
    radioq(val) {
      let that = this;
      if (val == "1") {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    handle(row, event, column) {
      if (this.currentRow != "") {
        this.disab = false;
      }
    },
    handleAvatarSuccess(res) {
      this.imageUrl = res.data;
      if (res.code == "0000") {
      this.$message.success(res.msg);
      }else{
      this.$message.error(res.msg)
      }
    },
    handleCurrentChange(val) {
      this.currentRow = val.lessonid;
    },
    // 分页
    handleSizeChange(size) {
      this.pagesize = size;
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
      this.getImgText();
    },
    current_change1: function(currentPage) {
      this.currentPage1 = currentPage;
      this.getaudio();
    },
    current_change2: function(currentPage) {
      this.currentPage2 = currentPage;
      this.getvideo();
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
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
.box {
  background: #f5f5f5;
}
.course {
  font-size: 18px;
  font-family: PingFangSC-Medium;
  font-weight: 700;
  color: rgba(51, 51, 51, 1);
}
.imgText {
  font-size: 18px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.title {
  padding: 20px;
}
.img-box {
    width: 150px;
    height: 150px;
}
.img-box img {
  width: 100%;
  height: 100%;
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
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 275px;
  height: 132px;
  line-height: 132px;
  text-align: center;
  background: rgba(251, 251, 251, 1);
  border: 1px dashed #d9d9d9;
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
.Choice ul li {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  height: 15px;
  padding: 20px;
}
.radio {
  margin-left: 125px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.cropper {
  width: auto;
  height: 300px;
}
</style>