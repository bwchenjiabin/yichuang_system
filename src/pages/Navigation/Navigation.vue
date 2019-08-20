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
        <el-main v-show="nav">
          <div class="title">
            <h4>导航设置</h4>
            <br>
            <br>
          </div>
          <el-radio v-model="radio" label="1" class="jd">经典导航</el-radio><br>
            <div class="img-box">
                <img src="../../../static/img/微信图片_20190806111042.png" alt="">
            </div><br>
          <el-radio v-model="radio" label="2" class="jd">自定义导航</el-radio><el-button type="primary" style="float: right;margin-right: 100px;" @click="switchtt">新增导航</el-button>
          <el-table
            ref="multipleTable"
            :data="list"
            v-loading="loading"
            tooltip-effect="dark"
            style="width: 100%"
            :header-cell-style="{background:'#f5f5f5',color:'#000'}"
            @selection-change="changeFun"
          >
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column  label="导航图标" >
               <template slot-scope="scope">
                 <i class="img-boxx"><img :src="'http://yckt.yichuangketang.com:8081'+scope.row.img"  alt=""></i>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="导航名称" show-overflow-tooltip></el-table-column>
            <el-table-column label="跳转链接" prop="targetid">
                </el-table-column>
            <el-table-column fixed="right" label="操作" >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="Clicksort(scope.row)">排序</el-button>
                <el-button type="text" size="small" @click="handleClicks(scope.row.id)">编辑</el-button>
                <el-button
                  size="small"
                  type="text"
                  @click.native.prevent="handleClick(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
           <br>
          <br>
          <div class="sort">
            移动到第
            <input type="number" v-model="sort">
            位
            <br>
            <br>
            <el-button @click="Clicknone()">取 消</el-button>
            <el-button type="primary" @click="sortrota()">确 定</el-button>
          </div>
          <br>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="current_change"
            @current-page="currentPage"
            :page-size="pagesize"
            background
            layout="total, prev, pager, next"
            :total="this.pageleng"
          ></el-pagination>
          <br><br>
          <el-button type="primary" @click="Choices">保存</el-button>
        </el-main>
         <el-main v-show="addnav">
      <div>
          <span class="course" @click="switcht" style="cursor: pointer">导航设置</span>&nbsp;&nbsp;&nbsp;
        /&nbsp;&nbsp;&nbsp;
        <span class="imgText">新增导航</span>
        <br>
        <br>
        <div class="title">
          <i class="icon"></i>
          <span>基本信息</span>
          <br>
          <br>
          <br>
          <span class="name">导航名称</span>
          <el-input placeholder="请输入名称，最多不超过4个字" v-model="input" clearable maxlength="4"></el-input>
          <span class="number">{{this.input.length}}/4</span>
          <br>
          <br>
          <br>
         <span class="name">导航图标</span>
          <p class="text">72*72像素，支持PNG、JPG、GIF格式，小于5M</p>
          <br>
          <br>
          <el-upload
            class="avatar-uploader"
            action="http://yckt.yichuangketang.com:8081/section/insertImg"
            :data="{accountId: this.userid}"   
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            accept=".jpg, .png, .gif,.svg,.jpeg,.tif,.raw" >
            <img v-if="imageUrl" :src="'http://yckt.yichuangketang.com:8081'+this.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <br>
          <br>
          <br>
          <span class="name">跳转设置</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-radio v-model="radios" label="1" @change="radioq">跳转到</el-radio>
          <el-button plain @click="Popup" :disabled="disabled">选择</el-button>
        </div> 
          <br>
          <br>
          <br>

        <el-button type="primary" @click="keep()">保存</el-button>
      </div>
    </el-main>
      </el-container>
    </el-container>
        <!-- 弹窗 -->
    <el-dialog title :visible.sync="delVisible" width="550px" center style="z-index: 999" :close-on-click-modal="false">
      <div class="del-dialog-cnt">
        <div class="tab">
          <el-tabs v-model="activeName" @tab-click="handleClickq">
            <el-tab-pane label="课程" name="lesson">
              <el-tabs
                :tab-position="tabPosition"
                style="height:400px;overflow:auto;position:relative"
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
                    style="width: 100%">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column property="lessonName" label="名称" width="120"></el-table-column>
                    <el-table-column property="upperoffTime" label="创建时间" width="120"></el-table-column>
                  </el-table>
                </el-tab-pane>
                   <!-- 图文分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="current_change0"
            @current-page="currentPage0"
            :page-size="pagesize"
            background
            layout="total, prev, pager, next"
            :total="this.twsize"
              v-if="this.courser == 'imgText'">
            </el-pagination>
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
            </el-tab-pane>
            <el-tab-pane label="分类" name="type" style="height:400px;overflow:auto;">
              <div class="Choice">
          <ul>
            <li v-for="(item,index) in Choice" :key="index">
              <el-radio v-model="radio2" :label="item.kindId" @change="changeq">{{item.kindName}}</el-radio>
              <br />
            </li>
          </ul>
        </div>
              </el-tab-pane><br><br>
          </el-tabs>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary"  @click="getdataadd()">保 存</el-button>
      </span>
    </el-dialog>
      <!-- 单条删除提示 -->
    <el-dialog title="提示" :visible.sync="delVisiblee" width="300px" center style="z-index: 999" :close-on-click-modal="false">
      <div class="del-dialog-cnt" style="text-align:center;">确定要删除该导航吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisiblee = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</el-scrollbar>
  
</template>
    <script>
import sidebar from "@/components/sidebar/sidebar.vue";
import Header from "@/components/Header/Header.vue";
import {rotary} from 'api/userAjax';
import {ImgText} from 'api/userAjax';
import {audio} from 'api/userAjax';
import {video} from 'api/userAjax';
import {insert} from 'api/userAjax';
import {insertNav} from 'api/userAjax';
import {DelNav} from 'api/userAjax';
import {sortNav} from 'api/userAjax';
import {Choicenav} from 'api/userAjax';
import {checkclass} from 'api/userAjax';

export default {
  data() {
    return {
   radio: '1',
   loading:true,
   list: [],
   total:0,
   pagesize: 5,
   pageleng:0,
   nav:true,
   addnav:false,
   sort:'',
   sortid:'',  //需要排序的id
   input: "",
    fileList: [],
    imageUrl: "", // 上传地址
    radios: "1",
    delVisible: false,
    delVisiblee: false,
    activeName: "lesson", //默认选择
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
    currentPage0:1,
    currentPage: 1,   //图文当前页
    currentPage1: 1,  //音频当前页
    currentPage2: 1,  //视频当前页
    imgurl:'',
    twsize:0,
    ypsize:0,
    spsize:0,
    userid:'',
    userid1:'',
    Jump:1,
    currid:'',
    pointtype:'lesson',
    pointtypes:'lesson',
    targetids:'',
    classid:'',
    };
  },
  created() {
    this.getdata();
    this.reload();
    this.getImgText()
    this.getaudio()
    this.getvideo()
    this.getdataClass();
    this.userid = localStorage.getItem('ex2')
  },
  methods: {
    changeq(val){
        this.classid = val;
    },
      // 查询分类
    getdataClass() {
        checkclass(localStorage.getItem('ex2')).then(res => {
            this.Choice = res.data;
      })
    },
     handleClickq(tab, event) {
        this.pointtype = tab.name;
      },
          // 单条删除
    handleClick(row) {
      this.delVisiblee = true;
      this.userid1 = row.id;
    },
beforeAvatarUpload (file) {
  let _this = this
  if (file.type.indexOf('image')<0) {
     _this.$message.error('图片格式不正确!')
    return false
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  const isSize = new Promise(function(resolve, reject) {
    let width = 72;
    let height = 72;
    let _URL = window.URL || window.webkitURL;
    let img = new Image();
    img.onload = function() {
      let valid = img.width == width && img.height == height;
      valid ? resolve() : reject();
    }
    img.src = _URL.createObjectURL(file);
  }).then(() => {
    return file;
  }, () => {

    _this.$message.error('上传的icon必须是等于72*72!')
    return Promise.reject();
  });
  return isSize
},
          changes(val){
      if (val == true) {
        this.valnum = 1
      }else{
        this.valnum = 2
      }
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
        //单条删除
    deleteRow() {
      this.delVisiblee = false;      
        DelNav({id:this.userid1}).then(res => {
          this.$message.success('删除成功')
            this.getdata();
      })
    },
    Clicksort(row) {
      this.sortid = row.id
      $(".sort").css("display", "block");
    },
    Clicknone(row) {
      $(".sort").css("display", "none");
    },
    Clickthen(row) {
      $(".sort").css("display", "none");
    },
    //轮播排序
      sortrota() {
      $(".sort").css("display", "none");
        sortNav({id:this.sortid,weight:this.sort,accountid:this.userid}).then(res => {
            this.sort = ""
          this.getdata();
           this.$message.success(res.data.msg)
      })
    },
        Popup() {
      this.delVisible = true;
    },
        getdataadd() {   
      this.pointtypes = this.pointtype
      if(this.pointtypes == 'lesson'){
        this.targetids = this.currentRow;
      }else if(this.pointtypes == 'type'){
        this.targetids = this.classid;
      }
      this.delVisible = false;
    },
      //多选值
    changeFun(val) {
      this.checkBoxData = val.map(item => item.id);
    },
     handleAvatarSuccess(res) {
      this.imageUrl = res.data;
      if (res.code == "0000") {
      this.$message.success(res.msg);
      }else{
      this.$message.error(res.msg)
      }
    },
    // 分页
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(val) {
      this.currentRow = val.lessonid;
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
      this.getdata();
    },
        current_change0: function(currentPage) {
      this.currentPage0 = currentPage;
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
        // 图文查询
    getImgText() {
        ImgText(localStorage.getItem('ex2'),"1",this.currentPage0).then(res => {
            this.tableData = res.data.data.data;
            this.twsize = res.data.data.total
      })
    },
   // 音频查询
    getaudio() {
        audio(localStorage.getItem('ex2'),"2",this.currentPage1).then(res => {
            this.tableData1 = res.data.data.data;
            this.ypsize = res.data.data.total
      })
    },
  // 视频查询
    getvideo() {
        video(localStorage.getItem('ex2'),"3",this.currentPage2).then(res => {
            this.tableData2 = res.data.data.data;
            this.spsize = res.data.data.total
      })
    },
    switcht(){
        this.nav = true;
        this.addnav = false;
    },
    switchtt(){
        this.nav = false;
        this.addnav = true;
    },
        // 获取当行内容
    handleClicks(id) {
      this.$router.push({
        path: `/editNav/${id}`
      });
    },
    // 展示
    getdata() {
        insertNav({accountId:localStorage.getItem('ex2'),page:this.currentPage}).then(res => {
            this.loading = false;
            if (res.data.code == "0000") {
                this.list = res.data.data.list;
                this.pageleng = res.data.data.total
          }
      })
    },
    Choices() {
        Choicenav({accountId:localStorage.getItem('ex2'),extendone:this.radio}).then(res => {
          this.$message.success(res.data);
      })
    },
    keep() {
      if (this.input == "") {
        this.$message.error("导航名称不可为空");      
        return;  
      }else if (this.imageUrl == "") {
        this.$message.error("导航图片不可为空");      
        return;  
      }else if(this.targetids == ''){
        this.$message.error("导航链接不可为空");      
      }else{
         insert({accountid:this.userid,name:this.input,pointtype:this.pointtypes,targetid:this.targetids,img:this.imageUrl}).then(res => {
        this.$message.success(res.data.msg);
        this.switcht();
        this.getdata();
        this.input = '';
        this.imageUrl = ''
        this.pointtypes = ''
        this.targetids = ''
        })
      }   
    },
    // 初始化回到顶部
    reload() {
     $('body,html').animate({scrollTop:0},200);
    },
  },
  components: {
    sidebar,
    Header,
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
  width: 72px;
  height: 72px; 
  line-height: 75px;
  text-align: center;
  background: rgba(251, 251, 251, 1);
  border: 1px dashed #d9d9d9;
  margin-left: 70px;
}
.avatar-uploader-icon:hover {
  border-color: #409eff;
}
.avatar {
    width: 74px;
    height: 74px;
    margin-left: 70px;
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
.sort {
  text-align: center;
  margin-top: 30px;
  display: none;
}
.sort input {
  width: 50px;
  height: 25px;
  background: rgba(251, 251, 251, 1);
  border: 1px solid rgba(238, 238, 238, 1);
}
.radio {
  margin-left: 125px;
}
.img-box{width: 400px;height: 100px;;display: inline-block;margin-bottom: 30px;}.img-box img{width: 100%;height: 100%;}
.jd {
padding: 0px 20px 50px 10px;
}
.img-boxx {
  width: 50px;
  height: 50px;
  padding-left: 10px;
  display: inline-block;
}
.img-boxx img {
  width: 100%;
  height: 100%;
}
 .el-scrollbar__wrap {
   overflow-x: hidden;
 }
</style>