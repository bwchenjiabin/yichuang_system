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
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/content' }">我的课程</el-breadcrumb-item>
              <el-breadcrumb-item>新增课程</el-breadcrumb-item>
            </el-breadcrumb><br>
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
              <i class="el-icon-delete icona" @click="delchapters(item.id)"></i>
              <i class="el-icon-edit-outline icona" @click="editmodify(item.id)"></i>
&nbsp;&nbsp;&nbsp;
            </div>
            <div class="table" v-for="(node,index2) in item.sections" :key="index2">
              <ul>
                <li>
                  {{index1+1}}-{{index2+1}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {{node.name}}
                  <div class="icons">
                    <i class="el-icon-edit-outline" @click="Popupp(node.id),aa(item.id)"></i>&nbsp;&nbsp;&nbsp;
                    <i class="el-icon-delete" @click="delsections(node.id)"></i>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 新增图文弹窗 -->
    <el-dialog title :visible.sync="delVisible" width="700px"  center style="z-index: 999" :close-on-click-modal="false">
      <div class="del-dialog-cnt">
        <span class="namea">标题</span>
        <el-input placeholder="请输入标题" v-model="input1" clearable maxlength="30"></el-input>
        <span class="number">{{this.input1.length}}/30</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-checkbox
          v-model="checked"
          @change="changes"
          value="0"
          @click="this.value=(this.value==0)?1:0"
        >是否试读</el-checkbox>
        <br>
        <br />
        <!-- 图片上传组件辅助 -->
        <UE :defaultMsg="defaultMsg" :config="config" :id="ue" ref="ue"></UE>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sections()">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 编辑图文弹窗 -->
    <el-dialog title :visible.sync="delVisiblee" width="700px"  center style="z-index: 999" :close-on-click-modal="false">
      <div class="del-dialog-cnt">
        <span class="namea">标题</span>
        <el-input placeholder="请输入标题" v-model="input2" clearable maxlength="30"></el-input>
        <span class="number">{{this.input2.length}}/30</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-checkbox
          v-model="checked1"
          @change="changes1"
          value="0"
          @click="this.value=(this.value==0)?1:0"
        >是否试读</el-checkbox>
        <br />
        <br />
        <br />
        <UE :defaultMsg="defaultMsg1" :config="config" :id="ue1" ref="ue1"></UE>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editsections()">保 存</el-button>
      </span>
    </el-dialog>

    <!-- 编辑章名称弹窗 -->
    <el-dialog title :visible.sync="editmodifys" width="600px" center style="z-index: 999" :close-on-click-modal="false">
      <div class="del-dialog-cnt">
        <div class="edit-title">
          修改章名称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-input placeholder="请输入新的章名称" v-model="input3" clearable maxlength="20"></el-input>
          <el-button type="primary" @click="editmodif()" style="margin-left:20px;">保 存</el-button>
        </div>
      </div>
    </el-dialog>

     <!-- 删除章提示 -->
      <el-dialog title="提示" :visible.sync="Deletez" width="300px" center style="z-index: 999" :close-on-click-modal="false">                      
        <div class="del-dialog-cnt" style="text-align: center;">确定要删除该章吗？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="Deletez = false">取 消</el-button>
          <el-button type="primary" @click="handleClicks()" >确 定</el-button>
      </span>
    </el-dialog>
         <!-- 删除节提示 -->
      <el-dialog title="提示" :visible.sync="Deletej" width="300px" center style="z-index: 999" :close-on-click-modal="false">                      
        <div class="del-dialog-cnt" style="text-align: center;">确定要删除该节吗？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="Deletej = false">取 消</el-button>
          <el-button type="primary" @click="handleClicksj()" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
    </el-scrollbar>
</template>
    <script>

import UE from "@/components/ue/ue";

import sidebar from "@/components/sidebar/sidebar.vue";
import Header from "@/components/Header/Header.vue";
import { ceshi } from "api/userAjax";
import { chapter } from "api/userAjax";
import { chaptsectioner } from "api/userAjax";
import { section } from "api/userAjax";
import { editsection } from "api/userAjax";
import { delsection } from "api/userAjax";
import { delchapter } from "api/userAjax";
import { editsection1 } from "api/userAjax";
import { querychapter } from "api/userAjax";
export default {
  data() {
    return {
      ue: "ue",
      ue1: "ue1",
      defaultMsg: "",
      defaultMsg1: "",
      config: {
        initialFrameWidth: null,
        initialFrameWidth: 650,
        initialFrameHeight: 500
      },
      input: "", // 章名称
      input1: "", // 新增节标题
      input2: "", // 修改节标题
      input3: "", // 修改章标题
      chapterids:'',
      delVisible: false, //新增弹窗
      delVisiblee: false, //编辑弹窗
      editmodifys: false, // 编辑章名称
      courseDetail: [],
      sectionid: "", //节ID
      chapterid: "", //章ID
      chapterId: "", //章ID
      delsectionID: "", //删除jieid
      delchapterID: "", //删除章id
      Id: "",
      checked: false, // 是否试读
      checked1: false, // 编辑是否试读
      Deletez:false,   //删除章
      Deletej:false,   //删除节
      date: [],
      date1: [],
      date2: [],
      date3: [],
      content: this.value,
      content1: this.value,

      header: {
      } // 有的图片服务器要求请求头需要有token
    };
  },
  created() {
    window.This = this
    this.getParams();
    this.getdata();
  },
  methods: {
    getUEContent() {
      let content = this.$refs.ue.getUEContent(); // 调用子组件方法
    },
    changes(val) {
      this.checked = val;
    },
    changes1(val) {
      this.checked1 = val;
    },
    onEditorChange({ editor, html, text }) {
      //内容改变事件
    },
    //获取传值
    getParams() {
      var routerParams = this.$route.params.id;
      this.Id = routerParams;
    },
    //新增节
    sections() {
      if (this.checked == true) {
        this.checked = 1;
      } else {
        this.checked = 0;
      }
      section(this.chapterid, this.input1, this.$refs.ue.getUEContent(), this.checked)
        .then(res => {
          this.delVisible = false;
          this.$message.success(res.data);
          this.input1 = "";
          this.$refs.ue.setUEContent("")
          this.getdata();
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    //删除节
    delsections(val) {
      this.delsectionID = val;
      this.Deletej = true;    
    },
        handleClicksj(){
     delsection(this.delsectionID)
        .then(res => {
          this.$message.success(res.data);
          this.Deletej = false
          this.getdata();
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    //删除章
    delchapters(val) {
      this.delchapterID = val;
      this.Deletez = true;
    },
    handleClicks(){
      delchapter(this.delchapterID)
        .then(res => {
          this.$message.success(res.data);
          this.Deletez = false;
          this.getdata();
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    //测试
    getdata() {
      ceshi(this.Id).then(res => {
        this.courseDetail = res.data;
      });
    },
    //新增章
    chapters() {
      chapter(localStorage.getItem("ex2"), this.Id, this.input)
        .then(res => {
          this.$message.success(res.data);
          this.getdata();
          this.input = ""
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    //修改节
    editsections() {
      if (this.checked1 == true) {
        this.checked1 = 1;
      } else {
        this.checked1 = 0;
      }
      editsection1(
        this.sectionid,
        this.chapterId,
        this.input2,
        this.$refs.ue1.getUEContent(),
        this.checked1
      )
        .then(res => {
          this.$message.success(res.data);
          this.delVisiblee = false;
          this.getdata();
          this.$refs.ue1.setUEContent("");
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    // 弹窗
    Popup(val) {
      this.chapterid = val; //章id
      this.delVisible = true;
      localStorage.setItem('chapterId',this.chapterid);
    },
    aa(val) {
      this.chapterId = val;
    },
    // 修改章名称
    editmodify(val) {
      this.chapterids = val
      this.editmodifys = true;
      querychapter(this.chapterids).then(res =>{
        this.input3 = res.data.name
      })
    },
    // 确认修改章名称
    editmodif(){
            chapter(localStorage.getItem("ex2"),this.Id, this.input3,this.chapterids)
        .then(res => {
          this.editmodifys = false;
          this.$message.success(res.data);
          this.getdata();
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    Popupp(val) {
      this.sectionid = val; //节id
      this.delVisiblee = true;
      editsection(this.sectionid).then(res => {
        this.input2 = res.data.name;
        this.$refs.ue1.setUEContent(res.data.url);
        this.checked1 = res.data.extend2;
        if (this.checked1 == 1) {
          this.checked1 = true;
        } else {
          this.checked1 = false;
        }
      });
    },
  },
  components: {
    sidebar,
    Header,
    UE
  }
};
</script>
<style scoped>
.box {
  background: #f5f5f5;
}
.avatar-uploader{display: none;}
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
.edit-title {
  padding: 15px;
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
.editor {
  line-height: normal !important;
  height: 300px;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>