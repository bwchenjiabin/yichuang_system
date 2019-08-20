<template>
  <div class="box">
    <el-main>
      <div>
        <router-link to>
          <span class="course" @click="switchss">轮播图</span>&nbsp;&nbsp;&nbsp;
        </router-link>/&nbsp;&nbsp;&nbsp;
        <span class="imgText">新增轮播</span>
        <br>
        <br>
        <div class="title">
          <i class="icon"></i>
          <span>基本信息</span>
          <br>
          <br>
          <br>
          <span class="name">轮播图名称</span>
          <el-input placeholder="请输入名称，最多不超过12个字" v-model="input" clearable maxlength="12"></el-input>
          <span class="number">{{this.input.length}}/12</span>
          <br>
          <br>
          <br>
          <span class="name">跳转设置</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-radio v-model="radios" label="1" @change="radioq">跳转到</el-radio>
          <el-button plain @click="Popup" :disabled="disabled">选择</el-button>
          <br>
          <br>
          <br>
          <el-radio v-model="radios" label="2" class="radio" @change="radioq">无跳转</el-radio>
          <br>
          <br>
          <br>
        </div>
          <span class="name">上传图片</span>
          <p class="text">240*180像素，支持PNG、JPG、GIF格式，小于5M</p>
          <br>
          <br>
          <el-upload
            class="avatar-uploader"
            action="http://yckt.yichuangketang.com:8081/section/insertImg"
            :data="{accountId: this.userid}"   
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            accept=".jpg, .png, .gif,.svg,.jpeg,.tif,.raw" >
            <img v-if="imageUrl" :src="'http://yckt.yichuangketang.com:8081'+this.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload><br><br>
          <span class="name">是否显示：</span>
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changes">
          </el-switch>
              <br />
              <br />
        <el-button type="primary" @click="keep();">保存</el-button>
      </div>
    </el-main>
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
                    style="width: 100%">
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
            </el-tab-pane><br><br>
             <!-- 图文分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="current_change"
            @current-page="currentPage"
            :page-size="pagesize"
            background
            layout="total, prev, pager, next"
            :total="this.twsize"
           v-if="this.courser == 'imgText'"></el-pagination>

                       <!-- 音频分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="current_change1"
            :current-page="currentPage1"
            :page-size="pagesize"
            background
            layout="total, prev, pager, next"
            :total="this.ypsize"
          v-if="this.courser == 'audio'"></el-pagination>

                       <!-- 视频分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="current_change2"
            :current-page="currentPage2"
            :page-size="pagesize"
            background
            layout="total, prev, pager, next"
            :total="this.spsize"
          v-if="this.courser == 'video'"></el-pagination>
          </el-tabs>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary"  @click="getdataadd()">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
    <script>
import {checkclass} from 'api/userAjax';
import {ImgText} from 'api/userAjax';
import {audio} from 'api/userAjax';
import {video} from 'api/userAjax';
import {addrotary} from 'api/userAjax';
export default {
  data() {
    return {
      input: "",
      fileList: [],
      imageUrl: "", // 上传地址
      radios: "1",
      delVisible: false,
      activeName: "courser", //默认选择
      radio2: "", // 选择分类
      tabPosition: "left", // 方向
      courser: "imgText", //默认选择
      currentRow: null,
      value: true, //按钮禁用
      valnum:1,
      disabled: false, //按钮禁用
      Choice: [],
      tableData: [],
      tableData1: [],
      tableData2: [],
      number:'',   //图文音频视频
      currentPage: 1,   //图文当前页
      currentPage1: 1,  //音频当前页
      currentPage2: 1,  //视频当前页
      pagesize: 5,
      imgurl:'',
      twsize:'',
      ypsize:'',
      spsize:'',
      userid:'',
      Jump:1,
      currid:'',

    };
  },
  created() {
    this.getdata()
    this.getImgText()
    this.getaudio()
    this.getvideo()
    this.userid = localStorage.getItem('ex2')
  },
  methods: {
    // 查询分类
    getdata() {
        checkclass(localStorage.getItem('ex2')).then(res => {
            this.Choice = res.data;
      })
    },
      //上传成功的回调
    handleAvatarSuccess(res) {
      this.imageUrl = res.data;
      if (res.code == "0000") {
      this.$message.success(res.msg);
      }else{
      this.$message.error(res.msg)
      }
    },
    changes(val){
      if (val == true) {
        this.valnum = 1
      }else{
        this.valnum = 2
      }
      console.log(this.valnum)
    },
    // 新增轮播
    getdataadd() {
      this.currid = this.currentRow 
      this.delVisible = false;
    },
    // 图文查询
    getImgText() {
        ImgText(localStorage.getItem('ex2'),"1",this.currentPage).then(res => {
            this.tableData = res.data.data.data;
            this.twsize = res.data.data.total
      })
    },
   // 音频查询
    getaudio() {
        audio(localStorage.getItem('ex2'),"2",this.currentPage1).then(res => {
            this.tableData1 = res.data.data.data;
            this.ypsize = res.data.data.total
            // console.log(res);
      })
    },
  // 视频查询
    getvideo() {
        video(localStorage.getItem('ex2'),"3",this.currentPage2).then(res => {
            this.tableData2 = res.data.data.data;
            this.spsize = res.data.data.total
      })
    },
    // 刷新页面
    switchss() {
      this.$router.go(0);
    },
    keep() {
      if (this.input == "") {
        this.$message.error("轮播图名称不可为空");      
        return;  
      }
      if (this.imageUrl == "") {
        this.$message.error("轮播图图片不可为空");      
        return;  
      }
      // else if (this.Jump == "1") {
      //   if (this.currid == "") {
      //     this.$message.error("轮播图跳转链接不可为空");       
      //     return; 
      //   }
      // }
      if (this.courser == "imgText") {
        this.number = 1;
      }if (this.courser == "audio") {
        this.number = 2;
      }
      if (this.courser == "video") {
        this.number = 3;
      }
      addrotary({name:this.input,owner:this.userid,lessonid:this.currid,img:this.imageUrl,extendtwo:this.valnum}).then(res => {
        this.$message.success(res.data.msg);
        this.switchss();
      })
    },
    radioq(val) {
      this.Jump = val;
      let that = this;
      if (val == "1") {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    handleCurrentChange(val) {
      this.currentRow = val.lessonid;
      console.log(val.lessonid)
    },
        // 分页
    handleSizeChange(size) {
      this.pagesize = size;
      // console.log(this.pagesize); //每页下拉显示数据
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
      submitUpload() {
        this.$refs.upload.submit();

      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        // console.log(file);
      },
    Popup() {
      this.delVisible = true;
    }
  },
  components: {
  }
};
</script>
    <style scoped>
.box {
  background: #f5f5f5;
  width: 100%;
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
  width: 277px;
  height: 134px;
  display: block;
  margin-left: 70px;
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
.img-box {
    width: 150px;
    height: 150px;
}
.img-box img {
  width: 100%;
  height: 100%;
}
</style>