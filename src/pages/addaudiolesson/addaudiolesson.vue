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
          <router-link to="/content">
            <span class="course" style="cursor: pointer;">我的课程</span>
          </router-link>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
          <span class="imgText">新增课程</span>
          <div class="title">
            <i class="icon"></i>
            <span>课程信息</span>
            <br />
            <br />
            <br />
            <el-input placeholder="请输入章节标题" v-model="input" clearable class="inp2"></el-input>
            <el-button type="primary" class="btn1" @click="chapters()">添加章</el-button>
          </div>
          <div v-for="(item,index1) in courseDetail.chapters" :key="index1" class="content">
            <div class="cont-title">
              <span class="chapter">第{{index1+1}}章</span>
              <span class="chapter_name txt-cut">{{item.name}}</span>
              <el-button plain class="btn" @click="Popup(item.id);">+添加节</el-button>
              <i class="el-icon-delete icona"></i>
            </div>
            <div class="table" v-for="(node,index2) in item.sections" :key="index2">
              <ul>
                <li>
                  {{node.name}}
                  <div class="icons">
                    <i class="el-icon-edit-outline" @click="Popupp(node.id),aa(item.id)"></i>&nbsp;&nbsp;&nbsp;
                    <i class="el-icon-delete"></i>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- <div class="content">
          <div class="cont-tit">
              <span class="chapter">第一章</span><span>章节标题</span><el-input placeholder="请输入章节标题" v-model="input1" clearable class="inp2"></el-input>
              <el-button plain class="btn">+添加节</el-button>
          </div>
          <el-button type="primary" class="btn1">添加章</el-button>
        </div>
        <div class="table">
          <ul>
            <li v-for="(item,index) in list" :key="index">{{item.name}}<div class="icons"><i class="el-icon-edit-outline" @click="Popupp"></i>&nbsp;&nbsp;&nbsp;<i class="el-icon-delete"></i></div></li>
          </ul>
          </div>-->
          <!-- <div class="content">
          <div class="cont-title">
              <span class="chapter">第二章</span><span>章节标题</span><el-input placeholder="请输入章节标题" v-model="input2" clearable class="inp2"></el-input>
              <el-button plain class="btn">+添加节</el-button><i class="el-icon-delete icona"></i>
          </div>
          </div>-->
        </el-main>
      </el-container>
    </el-container>
    <!-- 新增音频弹窗 -->
    <el-dialog title :visible.sync="delVisible" width="600px" center style="z-index: 999">
      <div class="del-dialog-cnt">
        <span class="namea">节标题</span>
        <el-input placeholder="请输入节标题" v-model="input1" clearable maxlength="12"></el-input>
        <span class="number">{{this.input1.length}}/12</span>
        <br />
        <br />
        <br />音频上传：&nbsp;&nbsp;&nbsp;
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="imageUrl"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :data="{
            chapterid:this.chapterid,
            name:this.input1
          }"
          :limit="1"
          accept=".mp3, .wav, .ogg"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpload()">保 存</el-button>
      </span>
    </el-dialog>

    <!-- 编辑音频弹窗 -->
    <el-dialog title :visible.sync="delVisiblee" width="600px" center style="z-index: 999">
      <div class="del-dialog-cnt">
        <span class="namea">节标题</span>
        <el-input placeholder="请输入节标题" v-model="input2" clearable maxlength="12"></el-input>
        <span class="number">{{this.input2.length}}/12</span>
        <br/>
        <br/>
        <br/>
             音频上传：&nbsp;&nbsp;&nbsp; <el-upload
          class="upload-demo"
          ref="upload1"
          :action="imageUrl1"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList1"
          :data="{
            id:this.sectionid,
            chapterid:this.chapterId,
            name:this.input2
          }"
          :limit="1"
          accept=".mp3,.wav,.ogg"
          :auto-upload="false">
          
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">保存</el-button> -->
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
         </el-upload>   
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpload1(),editvideosections()">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
    <script>
import sidebar from "@/components/sidebar/sidebar.vue";
import Header from "@/components/Header/Header.vue";
import { ceshi } from "api/userAjax";
import { chapter } from "api/userAjax";
import { chaptsectioner } from "api/userAjax";
import { section } from "api/userAjax";
import { editsection } from "api/userAjax";
import {editvideosection} from 'api/userAjax';
export default {
  data() {
    return {
      input: "", // 章名称
      input1: "", // 新增节标题
      input2: "", // 修改节标题
      delVisible: false, //新增弹窗
      delVisiblee: false, //编辑弹窗
      content: "", // 新增节
      content1: "", // 编辑节
      courseDetail: [],
      fileList:[],
      fileList1:[],
      imageUrl: "http://192.168.0.107:8081/section/insertSectionFile", // 上传地址
      imageUrl1:"http://192.168.0.107:8081/section/updateSection",  //修改地址
      sectionid: "", //节ID
      chapterid: "", //章ID
      chapterId: "", //章ID
      Id: "",
      date: [],
      date1: [],
      date2: [],
      date3: [],

      editorOption: {
        modules: {
          toolbar: [
            [
              "bold",
              "italic",
              "underline",
              "strike",
              "image",
              "video",
              "align",
              "formula",
              "link",
              "background",
              "code-block"
            ] // toggled buttons
            //  ['blockquote', 'code-block']
          ]
        }
      }
    };
  },
  created() {
    this.getParams();
    this.getdata();
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      //内容改变事件
    },
    //获取传值
    getParams() {
      var routerParams = this.$route.params.id;
      this.Id = routerParams;
    },


      //修改
      submitUpload1() {
        this.$refs.upload1.submit();
        this.getdata();
      },
      //新增
    submitUpload() {
      this.$refs.upload.submit();
      this.getdata();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    //测试
    getdata() {
      ceshi(this.Id).then(res => {
        this.courseDetail = res.data;
      });
    },
    //新增章
    chapters() {
      chapter("1", this.Id, this.input).then(res => {
        this.$message.success(res.data);
        this.getdata();
      });
    },
    //修改节
      editvideosections(){
          editvideosection(this.sectionid,this.chapterId,this.input2).then(res => {
            this.getdata()
            // this.delVisiblee = false;
      })  
        },

    // 弹窗
    Popup(val) {
      this.chapterid = val; //章id
      this.delVisible = true;
    },
    aa(val) {
      this.chapterId = val;
    },
    Popupp(val) {
      this.sectionid = val   //节id
      this.delVisiblee = true;
      editsection(this.sectionid).then(res => {
        this.input2 = res.data.name
      }) 
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
.inp3 {
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
  width: 630px;
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
  float: right;
  margin-top: 28px;
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
.hxj {
  margin-left: 100px;
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
</style>